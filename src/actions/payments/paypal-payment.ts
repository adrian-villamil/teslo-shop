'use server';

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";

export const paypalCheckPayment = async (paypalTransactionId: string | undefined) => {
  if (!paypalTransactionId) return;

  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener el token de verificación',
    };
  }

  const response = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!response) {
    return {
      ok: false,
      message: 'Error al verificar el pago.',
    };
  }

  const { status, purchase_units } = response;
  // const {} = purchase_units[0]; // Todo: Invoice ID

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Aún no se ha pagado en PayPal',
    };
  }

  // Todo: Realizar la actualización en nuestra base de datos
  try {
    console.log({ status, purchase_units });

    await prisma.order.update({
      where: {id: '680302ff-8d2d-4842-98db-46aa88f834ed'},
      data: {
        isPaid: true,
        paidAt: new Date(),
      }
    });

    // Todo: Revalidar un path

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: '500 - El pago no se pudo realizar',
    };
  }

};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8'
  ).toString('base64');

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: 'no-store'
    }).then(response => response.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (paypalTransactionId: string, bearerToken: string): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const result = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: 'no-store'
    }).then(response => response.json());
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};