export default function DefaultFooter() {
  return (
    <footer style={{ textAlign: 'center', padding: 16 }}>
      © {new Date().getFullYear()}
    </footer>
  );
}
