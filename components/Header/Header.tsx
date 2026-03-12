
import Link from "next/link"
import css from "./Header.module.css"
import Image from "next/image"


export default function Header() {

    return (
        <header className={css.header}>
            <Link href="/" aria-label="Home" className={css.link}>
                <Image
                    src="/rentalCar.svg"
                    className={css.logo}
                    alt="logo image"
                    width={136}
                    height={20}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                />
            </Link>
            <nav aria-label="Main Navigation">
                <ul className={css.navigationList}>
                    <li>
                        <Link href="/"
                            className={css.link}
                        >Home</Link>
                    </li>
                    <li>
                        <Link href="/cars">Catalog</Link>
                    </li>
                </ul>
            </nav>

        </header>

    )
}