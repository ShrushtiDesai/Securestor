import { useEffect, useState } from "react";
import {ethers} from "ethers";
import FileShare from "./artifacts/contracts/FileShare.sol/FileShare.json";
import './App.css';
import Sidebar from './components/Sidebar';

function App() {

  const [account, setAccount]=useState('');
  const [contract, setContract]=useState(null);
  const [provider, setProvider]=useState(null);

  useEffect(()=> {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const wallet = async()=> {
      if(provider){
        await provider.send("eth_requestAccounts",[]);
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged",() => {
          window.location.reload();
        })
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        console.log(account)
        setAccount(address);

        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          FileShare.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(signer);

      }
      else{
        alert("Metamask extension not found!!");
      }
    }
    provider && wallet()
  },[])
  return (
    <div className="sidebarheader">
      <Sidebar 
      userAddress={account}
      provider={provider}
      contract={contract} 
      ></Sidebar>
    </div>
  );
}

export default App;
