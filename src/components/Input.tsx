export default function Input({ type, placeholder, id }: { type: string, placeholder: string, id: string }) {
  return (
    <input type={type} placeholder={placeholder} id={id} style={{
      margin: '0.5%',
      padding: '0.8%',
      borderRadius: 7,
      backgroundColor: 'gray',
      color: "white",
    }} />
  )
}