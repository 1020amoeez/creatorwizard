// import { useToast } from "../state/hooks";
import { connectorsByName } from "../utils/web3React";

const useAuth = () => {
  // const { toastError } = useToast();

  const login = async (connectorID) => {
    console.log("connector", connectorID);
    const connector = connectorsByName[connectorID];
    if (connector) {
      if (connectorID === "injected") {
        await connector.activate(1116);
      } else {
        await connector.activate();
      }
    } else {
      // toastError("Can't find connector", "The connector config is wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const logout = async (connectorID) => {
    const connector = connectorsByName[connectorID];
    if (connector) {
      if (connector?.deactivate) {
        await connector.deactivate();
      } else {
        await connector.resetState();
      }
      // await connector.deactivate()
    } else {
      // toastError("Can't find connector", "The connector config is wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return { login, logout };
};

export default useAuth;
