import { contractAddress } from "@/blockchain/address";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Button, ButtonWrapper, Name, Text } from "@/utils/styles";
import { convertToEther, shorten } from "@/utils/utils";
import styled from "styled-components";
import {
  useAccount,
  useBalance,
  useBlockNumber,
  useConnect,
  useContractRead,
  useContractReads,
  useContractWrite,
  useDisconnect,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import abi from "../blockchain/abi.json";
const Home = () => {
  const mounted = useIsMounted();
  const { address, connector, isConnected, isDisconnected } = useAccount();

  const {
    data,
    isError,
    isLoading: balanceLoading,
  } = useBalance({
    address,
  });

  const {
    data: blockData,
    isError: blockError,
    isLoading: blockLoading,
  } = useBlockNumber();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { chain } = useNetwork();

  const { disconnect } = useDisconnect();

  const {
    data: contractData,
    isError: contractDataError,
    isLoading: contractDataLoading,
    isFetching: contractDataFetching,
  } = useContractReads({
    contracts: [
      {
        address: contractAddress,
        abi: abi.abi,
        functionName: "allowance",
        args: [address, contractAddress],
      },
      {
        address: contractAddress,
        abi: abi.abi,
        functionName: "name",
      },
    ],
  });

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi.abi,
    functionName: "approve",
    args: [contractAddress, "1000000000000000000"],
  });

  const {
    data: approveData,
    isLoading: approveLoading,
    isSuccess: approveIsSuccess,
    write: approveWrite,
  } = useContractWrite(config);
  console.log({
    data: approveData,
    isLoading: approveLoading,
    isSuccess: approveIsSuccess,
  });
  return (
    <>
      {mounted && (
        <Container>
          <div>
            <Text>Wagmi</Text>
            {connectors &&
              connectors.map((connector) => (
                <ButtonWrapper key={connector.id}>
                  <Button
                    disabled={!connector.ready}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name}
                    {!connector.ready && " (unsupported)"}
                    {isLoading &&
                      connector.id === pendingConnector?.id &&
                      "..."}
                  </Button>
                </ButtonWrapper>
              ))}

            {isConnected && (
              <div>
                <Text>{address && shorten(address)}</Text>
                <Text>Connected to {connector?.name && connector?.name}</Text>
                <ButtonWrapper>

                  <Button onClick={disconnect}>Disconnect</Button>
                  
                </ButtonWrapper>
              </div>
            )}
            {data && (
              <Text>
                Balance: {Number(data?.formatted).toFixed(4)} {data?.symbol}
              </Text>
            )}
            {blockData && <Text>Block number: {blockData}</Text>}

            {chain && <Text>Connected to {chain?.name}</Text>}
            {contractData && isConnected && (
              <Text>
                Allowance :{" "}
                {convertToEther(Number(contractData[0]?.toString()))}
              </Text>
            )}
            {contractData && <Text>Name : {String(contractData[1])}</Text>}
            {isConnected && (
              <ButtonWrapper>
                <Button
                  disabled={!approveWrite}
                  onClick={() => approveWrite?.()}
                >
                  Approve
                </Button>
              </ButtonWrapper>
            )}

            {isDisconnected && <Text>Wallet not connected</Text>}
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
const Container = styled.div<any>`
  height: 100vh;
  display: grid;
  place-items: center;
`;
