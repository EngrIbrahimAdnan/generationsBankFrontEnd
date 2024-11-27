"use server";

const baseUrl = "http://localhost:8080/api/guardian";
const headers = new Headers();
headers.append("Content-Type", "application/json");

// Bearer token
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInN1YiI6IlJhbWVucyIsImlhdCI6MTczMjY4MzM3NSwiZXhwIjoxNzMyNjg2OTc1fQ.J_SpYnSzVCecApIwDi0UYCTLFfrPr5KO1aKXP9d_FmU";

// Append Authorization header
headers.append("Authorization", `Bearer ${token}`);

/**
 * Transfer funds between accounts.
 * @param {Object} data - { senderAccountId, receiverAccountId, amount }
 */
export async function transfer(data) {
  const response = await fetch(`${baseUrl}/transfer`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * Add a dependent to a guardian.
 * @param {Object} data - { guardianId, dependentId }
 */
export async function addDependent(data) {
  console.log(data);
  const response = await fetch(`${baseUrl}/addDependent`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * View dependents for a guardian.
 * @param {number} guardianId - Guardian ID.
 */
export async function viewDependents(guardianId) {
  const response = await fetch(`${baseUrl}/${guardianId}/dependents`, {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
}

/**
 * View transactions with optional filters.
 * @param {number} guardianId - Guardian ID.
 * @param {Object} filters - { startDate, endDate, category }
 */
export async function viewTransactions(guardianId, filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const response = await fetch(
    `${baseUrl}/viewTransactions/${guardianId}?${query}`,
    {
      method: "GET",
      headers,
    }
  );
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.json();
}

/**
 * Set a spending limit for a dependent.
 * @param {number} dependentAccountId - Dependent's account ID.
 * @param {number} limit - Spending limit.
 */
export async function setSpendingLimit(dependentAccountId, limit) {
  const query = new URLSearchParams({ dependentAccountId, limit }).toString();
  const response = await fetch(`${baseUrl}/setSpendingLimit?${query}`, {
    method: "PUT",
    headers,
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * Approve or reject a transaction.
 * @param {number} transactionId - Transaction ID.
 * @param {boolean} approve - Approve or reject the transaction.
 */
export async function approveTransaction(transactionId, approve) {
  const query = new URLSearchParams({ transactionId, approve }).toString();
  const response = await fetch(`${baseUrl}/approveTransaction?${query}`, {
    method: "PUT",
    headers,
  });
  if (!response.ok) {
    throw new Error(await response.text());
  }
  return await response.text();
}

/**
 * Decode a JWT token and get the body (payload).
 * @param {string} token - The JWT token to decode.
 * @returns {Object} - The decoded JWT payload.
 */
export async function decodeJwt(token) {
  // Split the token into three parts: header, payload, signature
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  // Decode the payload (the second part of the token)
  const payload = parts[1];

  // Decode base64url to base64
  const base64Url = payload.replace(/-/g, "+").replace(/_/g, "/");
  const base64 = base64Url.padEnd(
    base64Url.length + ((4 - (base64Url.length % 4)) % 4),
    "="
  );

  // Decode the base64 string into JSON
  const decoded = JSON.parse(atob(base64));

  return decoded;
}
