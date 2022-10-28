import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      subscriberName: event.target.name.value,
      subscriberEmail: event.target.email.value,
    }

    fetch("./.netlify/functions/triggerSubscribeEmail", {
      method: "POST",
      body: JSON.stringify({
        subscriberName: data.subscriberName,
        subscriberEmail: data.subscriberEmail,
        inviteeEmail: "tara@netlify.com",
      }),
    });
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Next App Email Test</title>
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
         <label htmlFor="name">Name</label>
         <input type="text" id="name" name="name" required />

         <label htmlFor="email">Email</label>
         <input type="text" id="email" name="email" required />

         <button type="submit">Subscribe</button>
       </form>
      </main>
    </div>
  )
}
