import Link from "next/link";
import Image from "next/image";
import { Quote } from "lucide-react";

export const Contact = () => {
  const contactLinks = [
    {
      name: "Email",
      href: "mailto:ixyoussef46@gmail.com",
    },
    {
      name: "Github",
      href: "https://github.com/YoussefMohammed93",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61552702670893",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/youssef-mohammed-6893a031b/",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/youssef_mohamed.93",
    },
  ];

  return (
    <footer id="contact">
      <div className="flex flex-col lg:grid lg:grid-cols-5 lg:grid-rows-4">
        <div className="order-1 lg:order-none col-span-2 row-span-4 main-padding bg-[#0e0e0e] text-white p-6">
          <h1 className="text-3xl lg:text-4xl font-bold font-sans">
            Available for select freelance opportunities
          </h1>
          <p className="flex flex-col gap-y-10 font-mono text-2xl my-20">
            Have an exciting project you need help with?
            <br />
            <span>Send me an email or contact me via instant message!</span>
          </p>
          <ul className="mt-4 space-y-1">
            {contactLinks.map((link, index) => (
              <li
                key={index}
                className="font-mono text-xl lg:text-2xl font-semibold"
              >
                <Link
                  href={link.href}
                  target="_"
                  className="hover:text-white/80 transition-all duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-2 lg:order-none row-span-4 col-start-3 bg-[#923fe6] text-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Quote className="size-12" />
            </div>
            <div>
              <Image
                src="/Avatar1.png"
                width={80}
                height={80}
                className="rounded-full border-2 border-white"
              />
            </div>
          </div>
          <p className="italic">
            "Youssef Mohammed was a pleasure to work with. He built a sleek,
            responsive website that exceeded my expectations. Youssef was
            professional, detail-oriented, and efficient, perfectly capturing my
            vision with great design and functionality. Communication was clear,
            and he delivered on time. I highly recommend Youssef for front-end
            development!"
          </p>
          <div className="mt-4 font-semibold">
            - Mark Greenspan
            <br />
            <span className="text-xs font-normal">
              Founder at influence THIS Canada
            </span>
          </div>
        </div>
        <div className="order-3 lg:order-none col-span-2 row-span-2 col-start-4 bg-[#0067dc] main-padding text-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Quote className="size-12" />
            </div>
            <div>
              <Image
                src="/Avatar2.png"
                width={80}
                height={80}
                className="rounded-full border-2 border-white"
              />
            </div>
          </div>
          <p className="italic">
            "Youssef Mohammed built a great e-commerce platform for my online
            courses. The site is user-friendly and functional. He was responsive
            and delivered exactly what I needed. Highly recommend him for
            e-commerce development."
          </p>
          <div className="mt-4 font-semibold">
            - Eva Monroe
            <br />
            <span className="text-xs font-normal">
              Agile Coach | Speaker | Trainer
            </span>
          </div>
        </div>
        <div className="order-4 lg:order-none col-span-2 row-span-2 col-start-4 row-start-3 main-padding bg-[#bc60fb] text-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Quote className="size-12" />
            </div>
            <div>
              <Image
                src="/Avatar3.png"
                width={80}
                height={80}
                className="rounded-full border-2 border-white"
              />
            </div>
          </div>
          <p className="italic">
            "Youssef Mohammed created a beautiful, user-friendly coffee
            e-commerce site for us. The platform runs smoothly, and the checkout
            process is seamless. Highly recommend him for e-commerce
            development."
          </p>
          <div className="mt-4 font-semibold">
            - Jonathan Castro
            <br />
            <span className="text-xs font-normal">
              CEO & Founder at The Cliff
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
