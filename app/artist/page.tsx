import Header from "@/components/Header/header";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Artist() {
    return (
        <>
            <main className="flex min-h-screen flex-col px-5 sm:px-10 py-5 bg-[#e1efff] dark:bg-black sm:items-start">
                <div className="flex justify-end w-full text-right">
                    <Header />
                </div>

                <div className="flex flex-col md:flex-row w-full gap-3">

                    {/* Right section – show FIRST on mobile */}
                    <div className="order-1 md:order-2 md:basis-1/2 md:flex md:items-center md:justify-end
                  text-left md:text-right font-medium">
                        <span className="text-[#d8675e]">Total - 50</span>
                    </div>

                    {/* Left section */}
                    <div className="order-2 md:order-1 flex flex-row items-center gap-4 w-full md:basis-1/2">
                        <p className="text-2xl whitespace-nowrap text-[#1f5692] font-semibold">Artist</p>

                        <div className="relative flex-1 max-w-xs">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="h-9 md:h-10 block w-full pr-10 pl-4 py-2 text-sm text-gray-900
                   border border-black rounded-full bg-gray-50
                   focus:ring-blue-500 focus:border-blue-500
                   dark:bg-gray-700 dark:border-black dark:text-white"
                            />

                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <MagnifyingGlassIcon className="w-5 h-5 text-gray-700" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col w-full pt-10 md:flex-row">
                    <div className="basis-1/2">
                        <ol className="list-decimal list-inside space-y-2 text-gray-800">
                            <li>
                                <Link href={`/artist/${1}`}>David Lah</Link>
                            </li>
                            <li>
                                <Link href={`/artistSongList/${2}`}>Kane</Link>
                            </li>
                            <li>Saw tar</li>
                            <li>Paul Gyi</li>
                            <li>Thang Taung</li>
                            <li>Ah nge Lay</li>
                        </ol>
                    </div>
                    {/* const startingPoint = "10";

                    // Use parseInt or the Number constructor
                    <ol start={parseInt(startingPoint, 10)}>
                        <li>...</li>
                    </ol> */}
                    {/* <div className="basis-1/2">
                        <ol start={24} className="list-decimal list-inside space-y-2 text-gray-800">
                            <li>Praise (Elevation)</li>
                            <li>
                                <Link  href={`/allsongs/${1}`}>တခုပြီး တခု</Link>
                                </li>
                            <li>ထိုသခင်နာမ</li>
                            <li>ကိုယ်တော်ပဲလေ</li>
                            <li>ကျေးဇူးတော် လောက်ပေ၏</li>
                            <li>ဧမာနွေလ</li>
                            <li>ကိုယ်တော်သာ</li>
                            <li>မင်းမျိုးမင်းနွယ်</li>
                            <li>မေရှိယ</li>
                            <li>ခရစ္စမတ် အဓိပ္ပါယ်</li>
                            <li>အဖ မေတ္တာ</li>
                            <li>အမွေခံ</li>
                            <li>ခရစ္စမတ် အဓိပ္ပါယ်</li>
                            <li>မင်းမျိုးမင်းနွယ်</li>
                            <li>မေရှိယ</li>
                            <li>ခရစ္စမတ် အဓိပ္ပါယ်</li>
                            <li>အဖ မေတ္တာ</li>
                            <li>အမွေခံ</li>
                            <li>ခရစ္စမတ် အဓိပ္ပါယ်</li>
                            <li>ခရစ္စမတ် အဓိပ္ပါယ်</li>
                            <li>အဖ မေတ္တာ</li>
                            <li>အမွေခံ</li>
                            <li>ခရစ္စမတ် အဓိပ္ပါယ်</li>
                        </ol>
                    </div> */}
                </div>
            </main>
        </>
    )
}