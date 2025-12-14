import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const RESEND_FROM_EMAIL = Deno.env.get('RESEND_FROM_EMAIL')!;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  try {
    const order = await req.json();
    console.log("Incoming order:", order);

    const cartHtml = JSON.parse(order.cart || "[]")
      .map((item: any) => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${item.title}</td>
          <td style="padding: 10px 0; text-align: center; border-bottom: 1px solid #eee;">${item.quantity}</td>
          <td style="padding: 10px 0; text-align: right; border-bottom: 1px solid #eee;">$${item.total}</td>
        </tr>
      `)
      .join("");

    const html = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px;">
        <h2 style="color: #2b2b2b; border-bottom: 2px solid #eee; padding-bottom: 10px;">
          Thank you for your order, ${order.fullName}!
        </h2>

        <p style="font-size: 16px;">Your order has been successfully placed. Below are the order details:</p>

        <div style="background: #f9f9f9; padding: 15px 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e5e5;">
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Total Amount:</strong> $${order.total}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          <p><strong>Email:</strong> ${order.email}</p>
        </div>

        <h3>Order Items:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr>
              <th style="border-bottom: 2px solid #ddd; padding: 10px; text-align: left;">Product</th>
              <th style="border-bottom: 2px solid #ddd; padding: 10px; text-align: center;">Qty</th>
              <th style="border-bottom: 2px solid #ddd; padding: 10px; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>${cartHtml}</tbody>
        </table>

        <h3>Shipping Details:</h3>
        <div style="background: #f9f9f9; padding: 15px 20px; border-radius: 8px; border: 1px solid #e5e5e5;">
          <p><strong>City:</strong> ${order.city}</p>
          <p><strong>Street:</strong> ${order.street}</p>
          <p><strong>ZIP:</strong> ${order.zip}</p>
          ${order.comment ? `<p><strong>Comment:</strong> ${order.comment}</p>` : ""}
        </div>

        <p style="margin-top: 30px; font-size: 14px; color: #555;">
          If you have any questions — just reply to this email.
        </p>

        <p style="font-size: 14px; color: #999;">— Hesrun Store</p>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [order.email],
        subject: `Your order #${order.id}`,
        html,
      }),
    });

    const data = await res.json();
    console.log("Resend response:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    });

  } catch (err) {
    console.error("Error in edge function:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});
