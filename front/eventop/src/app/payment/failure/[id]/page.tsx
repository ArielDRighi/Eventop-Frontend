"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IQueryData {
  preference_id: string;
  collection_status: string;
  payment_id: string;
  status: string;
  id: string;
}

const PaymentFailurePage = () => {
  const router = useRouter();
  const [queryData, setQueryData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const URLparams = new URLSearchParams(window.location.search);
    const preference_id = URLparams.get("preference_id");
    const collection_status = URLparams.get("collection_status");
    const payment_id = URLparams.get("payment_id");
    const status = URLparams.get("status");
    const id = params.id as string;

    const dataToSend = {
      preference_id,
      collection_status,
      payment_id,
      status,
      id,
    };

    console.log(dataToSend);
    setQueryData(dataToSend);
  }, []);

  return (
    <div>
      <h1>Payment Failure</h1>
      {queryData ? (
        <div>
          <p>Transaction ID: {queryData.transactionId}</p>
          <p>Reason: {queryData.reason}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentFailurePage;
