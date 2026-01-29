import Header from "@/components/Header/header";
import classes from "@/app/home.module.css";
import books from "@/assets/book.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col bg-[#e1efff] dark:bg-black sm:items-start">
          <div className={classes.home}>
            <div className={classes.imgBook} >
              <Image src={books} alt="home books"
                width={250}
                height={300}
              />
            </div>
            <div className={classes.content}>
              <p className={classes.title}>Chord Bank</p>
              <p>
                <Link href="/songs"><button type="button" className={classes.customButton}>All Songs</button></Link>
              </p>
              <p>
                <Link href="/artist"><button type="button" className={classes.customButton}>Artist</button></Link>
              </p>
            </div>
          </div>
        </main>
        {/* <footer style={{ background: '#051929' }} className="sticky bottom-0 text-white text-center py-2">
                <p className='text-sm'> © 2026. All Rights Reserved </p>
            </footer> */}
      </div>
    </>
  );
}
