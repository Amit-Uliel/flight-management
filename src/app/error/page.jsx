import Link from "next/link";

export default function ErrorPage() {
  return (
    <div style={{ direction: 'rtl', textAlign: 'center', padding: '20px' }}>
      <p>אופס, קרתה תקלה</p>
      <Link href="/login">
        <button style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}>
          חזור לדף ההתחברות
        </button>
      </Link>
    </div>
  );
}