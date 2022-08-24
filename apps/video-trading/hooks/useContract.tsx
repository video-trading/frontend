import { useQuery } from "@tanstack/react-query";
import { ContractClient } from "client";
import React from "react";

export function useContract() {
  const query = useQuery(["contracts"], async () => {
    const client = new ContractClient();
    console.log("client", client);
    const { data, error } = await client.getContracts();
    if (error) {
      throw error;
    }
    return data;
  });

  return query;
}
