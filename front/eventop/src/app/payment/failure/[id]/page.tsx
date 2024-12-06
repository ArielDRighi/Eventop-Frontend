"use client";
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
  const [queryData, setQueryData] = useState<IQueryData | null>(null);
  const params = useParams();

  useEffect(() => {
    const URLparams = new URLSearchParams(window.location.search);
    const preference_id = URLparams.get("preference_id") || "";
    const collection_status = URLparams.get("collection_status") || "";
    const payment_id = URLparams.get("payment_id") || "";
    const status = URLparams.get("status") || "";
    const id = params.id as string;

    const dataToSend: IQueryData = {
      preference_id,
      collection_status,
      payment_id,
      status,
      id,
    };

    console.log(dataToSend);
    setQueryData(dataToSend);
  }, [params.id]);

  return (
    <div>
      <h1>Payment Failure</h1>
      {queryData ? (
        <div>
          <p>Transaction ID: {queryData.preference_id}</p>
          <p>Reason: {queryData.status}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentFailurePage;
