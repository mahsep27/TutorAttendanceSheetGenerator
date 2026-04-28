export default async function handler(req, res) {
  try {
    const googleWebhook = "https://script.google.com/macros/s/AKfycbyqyBAERQbD_RRX_zcirXEjgDEq4UY2jkOoPQ5Ly4BAFt2mBnnsoXfUsVA6tXMla9nYFQ/exec";

    const response = await fetch(googleWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    res.status(200).json({
      success: true,
      sheetUrl: data.sheetUrl,
      action: data.action,
      message: data.message
    });

  } catch (error) {
    console.error("❌ Proxy Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
