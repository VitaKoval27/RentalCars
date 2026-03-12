import Image from "next/image";
import css from "./home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={css.container}>
      <Image
        src="/hero.jpg"
        className={css.image}
        alt="hero image"
        width={1140}
        height={700}
        style={{ width: '100%', height: 'auto' }}
        priority
      />
      <div className={css.content}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
        <Link href="/cars" className={css.button}>View Catalog</Link>
      </div>
    </div>
  )
}
