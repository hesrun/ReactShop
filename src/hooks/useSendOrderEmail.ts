import { useState } from "react";

const API_URL = import.meta.env.VITE_SUPABASE_FUNCTION_URL;

const useSendOrderEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendEmail = async (payload: any): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = await res.json();

            if (!res.ok || json.success === false) {
                throw new Error(json.error || json.message || "Failed to send email");
            }

            return true;
        } catch (err: any) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { sendEmail, loading, error };
}

export default useSendOrderEmail