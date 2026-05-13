// app/page.tsx or components/Hero.tsx

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useMagneticButtons } from "@/hooks/useMagneticButtons";
import { useCustomCursor } from "@/hooks/useCustomCursor";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import { useLenis } from "@/hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useLenis();

  const heroRef = useRef<HTMLDivElement>(null);

  useMouseParallax();
  useMagneticButtons();
  useCustomCursor();
  useNavbarScroll();

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.to("#hero-badge", {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })
      .to(
        "#hero-headline .word",
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.09,
        },
        0.3,
      )
      .to(
        "#hero-sub",
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
        },
        0.8,
      )
      .to(
        "#btn-group",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        1,
      );

    gsap.to("#hero-content", {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: -80,
      opacity: 0.2,
      scale: 0.96,
    });

    const video = videoRef.current;

    if (video) {
      video.pause();

      video.addEventListener("loadedmetadata", () => {
        gsap.to(video, {
          currentTime: video.duration,
          ease: "none",

          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "+=3000", // longer = smoother animation
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <main>
      {/* Cursor */}
      <div id="cursor-dot" />
      <div id="cursor-ring" />

      {/* Noise */}
      <div id="noise" />

      {/* HERO */}
      <section
        id="hero"
        ref={heroRef}
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        {/* VIDEO BG */}
        <div id="video-bg" className="absolute inset-[-8%] z-0 overflow-hidden">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="gradient-overlay" />
          <div className="grid-lines" />
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>

        {/* CONTENT */}
        <div
          id="hero-content"
          className="relative z-10 mx-auto max-w-[1100px] px-8 text-center"
        >
          <div id="hero-badge" className="hero-badge">
            <div className="badge-dot" />
            Next-Gen Automotive AI
          </div>

          <h1 id="hero-headline" className="hero-headline">
            <span className="word">The</span>
            <span className="word">AI</span>
            <span className="word highlight">Brain</span>
            <span className="word">Behind</span>
            <br />
            <span className="word">Every</span>
            <span className="word">Sale</span>
          </h1>

          <p id="hero-sub" className="hero-sub">
            AI-powered automotive ecosystems transforming dealerships into
            high-performance revenue machines.
          </p>

          <div id="btn-group" className="btn-group">
            <button className="btn btn-primary" data-magnetic>
              Request Demo
            </button>

            <button className="btn btn-secondary" data-magnetic>
              Explore Platform
            </button>
          </div>
        </div>

        {/* PARTICLES */}
        <canvas id="particles-canvas" />

        {/* VIGNETTE */}
        <div className="vignette" />
      </section>

      <section>
        <div className="container">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis
          unde nemo numquam magni fugiat similique molestias rerum animi ducimus
          praesentium, consequatur voluptas sapiente, non est repudiandae
          aliquam temporibus repellat placeat vitae fugit blanditiis ut optio.
          Cum distinctio nesciunt reiciendis explicabo fugiat eveniet ducimus
          laudantium facere. Magni odit voluptatibus et possimus dolores optio
          accusantium dicta earum eveniet quidem similique nemo ullam odio in
          officiis nam saepe ipsum nostrum maiores labore perspiciatis,
          accusamus fugit. Soluta pariatur placeat incidunt nihil, at provident,
          nostrum officia expedita asperiores, accusamus illo repudiandae
          corporis vero saepe unde molestiae voluptate non quo adipisci.
          Deserunt voluptate, id dicta animi magni eveniet, eos quaerat
          blanditiis vero odio laborum recusandae atque ad facilis maxime
          maiores distinctio? Quidem fugit laborum sunt? Eum, numquam rem,
          dignissimos vel earum asperiores molestiae quo distinctio omnis
          blanditiis voluptatum nisi soluta voluptate esse, nam quas autem
          facilis praesentium doloremque doloribus molestias mollitia. Ipsam
          dolore dolorem ut ducimus odio fugiat? Aspernatur, ipsum dolorum. Sunt
          voluptatem mollitia numquam nulla, nam dolore iste? Sequi ipsum omnis
          sit illum, hic libero cum odio voluptas excepturi veritatis, sunt quam
          culpa! Quasi eum officia incidunt cumque, a corrupti temporibus,
          tenetur eos excepturi iste, perferendis ullam ipsa quod tempora
          dolorem. Fuga suscipit tempora dolorem, quod perspiciatis autem
          voluptates rem magnam veritatis repellendus aspernatur officia
          recusandae sequi! Doloribus laborum non veniam, ipsum voluptatum iusto
          eum quaerat veritatis ducimus ad numquam. Quidem earum minus
          voluptatibus necessitatibus nulla, optio eveniet sunt accusantium
          corporis dignissimos deleniti praesentium commodi dolores maiores.
          Optio natus dignissimos exercitationem est provident mollitia,
          distinctio, autem ut sunt in repellat veritatis voluptatibus a velit.
          Magnam numquam minus ea suscipit sed saepe? Corrupti quasi ab
          inventore nobis consequatur odit provident recusandae commodi
          laudantium, earum optio, obcaecati, esse sit expedita quos ipsum minus
          dolores praesentium vel ut cumque eveniet culpa atque modi! Tempore,
          consectetur quis delectus ipsam corrupti quo quaerat! Inventore sequi
          unde accusamus minus numquam earum enim exercitationem voluptatum
          consectetur, esse vel vitae repellendus. Quis ullam fugiat sit
          dignissimos facere natus magnam! Distinctio quidem quos aut magnam,
          facere fuga deleniti eligendi culpa optio id dignissimos minus,
          laudantium quo explicabo accusamus eaque ipsam, omnis ducimus amet
          blanditiis perspiciatis dicta tempore! Saepe quidem, atque expedita,
          nobis ea sequi aspernatur odio qui nihil ratione nemo dolor, placeat
          perspiciatis blanditiis laboriosam? Sint eveniet facilis sunt, at quia
          optio sequi. Dolorum nemo iste facere consectetur reiciendis placeat
          quia, rerum dignissimos? Quo, quibusdam iure explicabo tenetur,
          corporis eos dolores non, eaque consequuntur ipsam similique.
          Architecto nulla illo reiciendis tempore, ducimus nisi odio. Itaque,
          earum quos natus corrupti quo reiciendis quidem, dolorum sed
          dignissimos ipsum, quis magnam nesciunt inventore ullam aliquam
          recusandae. Cum ut aut earum ipsum! Sapiente repellat nemo iste
          possimus officia? Excepturi saepe repudiandae placeat consequatur quas
          maiores, expedita amet adipisci. Asperiores laudantium quaerat
          architecto quod molestiae odio nam, blanditiis minus atque suscipit
          ipsum? Tenetur iure culpa quidem nobis aperiam dicta repudiandae
          incidunt obcaecati dolor. Magni maiores cupiditate nemo perspiciatis,
          sint facilis harum sequi ducimus delectus pariatur alias velit libero
          dolorum ratione repellendus, odit quis. Aspernatur eligendi deleniti
          nobis provident suscipit! Minima totam atque ipsam vitae dicta aperiam
          rerum vel aliquid animi labore. Ab, perspiciatis vero necessitatibus
          facere facilis beatae fugiat assumenda dolorum reiciendis, quibusdam
          ipsam natus totam debitis, molestias in a dicta reprehenderit aliquid!
          Aut tempore nisi blanditiis cupiditate distinctio quo quod labore
          veniam explicabo voluptate ab enim facilis commodi nesciunt, eaque,
          magnam provident dignissimos. Ipsa error doloribus blanditiis nisi.
          Officiis, corrupti mollitia maiores necessitatibus saepe laudantium
          assumenda eaque? A maxime molestias, reprehenderit veniam reiciendis
          enim doloremque ad laborum corporis, labore illo suscipit? Minus earum
          reiciendis, vel reprehenderit exercitationem officia repellendus quo
          architecto. Dicta aspernatur, velit minima amet natus consectetur
          modi, illum fuga dolores sint nobis praesentium? Quae nostrum quisquam
          aliquid aperiam consequuntur eos natus doloribus non quod, et, amet
          iste dignissimos incidunt eveniet. Doloribus recusandae repellendus
          alias, praesentium ratione officia nihil, laboriosam quaerat, non sunt
          illum ducimus dicta molestiae? Voluptatibus nemo minima, dolore
          tenetur praesentium nisi necessitatibus accusamus reprehenderit
          officia error porro ipsa pariatur excepturi at blanditiis? Placeat
          delectus asperiores cumque accusamus? Corrupti quisquam provident
          aliquid commodi. Officiis nostrum dolore quae ipsam adipisci
          blanditiis voluptate sapiente distinctio tempora. Perspiciatis fugit
          nisi ducimus consequuntur dolore tempora similique laborum quae atque
          beatae ex nam nesciunt voluptatibus magnam, impedit tempore neque enim
          aspernatur quis itaque blanditiis! Sint nobis tempore natus amet
          maxime illo, ipsa consequuntur alias expedita quos necessitatibus
          officiis quidem hic iure tempora ea eaque quia? Et nobis facilis,
          rerum libero minima quisquam dolores dolor blanditiis necessitatibus
          nesciunt aspernatur quae, earum modi sunt quos ipsam aliquam ducimus
          corporis totam. Quidem eveniet quo culpa repellendus ipsa in nulla
          sequi, recusandae, rem, id blanditiis suscipit ipsam! Consectetur
          tempora placeat repellat inventore perspiciatis eos sunt voluptatem
          sit aliquid quisquam dicta alias minima excepturi voluptate facilis
          nesciunt qui, nulla hic repudiandae libero reiciendis expedita
          deleniti optio numquam. Soluta placeat fuga dicta? Aliquam distinctio
          aperiam reprehenderit, delectus quo rerum nostrum a harum error
          aliquid repellendus dignissimos id neque aut vel voluptates! Incidunt
          fuga in temporibus odio ex! Animi a hic ullam eligendi corporis
          necessitatibus libero, sapiente totam unde! Repellat ratione
          reiciendis facere animi consectetur molestiae temporibus ipsa
          provident dolor eligendi maxime veniam fugit ipsam placeat velit
          dolorem accusantium dolore nihil, vel ex eum voluptate laboriosam
          quod. Nisi odio optio qui enim debitis maxime quam reiciendis laborum
          reprehenderit fugiat quia eveniet deleniti natus provident maiores
          velit aspernatur voluptatibus, veritatis asperiores! Magni asperiores
          aliquid cupiditate ex velit ratione ab atque accusamus soluta quos
          aut, consectetur, nulla laborum fugiat, et iure distinctio natus
          obcaecati. Aliquam officia accusantium nihil perferendis, molestias
          magni libero itaque maiores, suscipit veritatis possimus quidem
          provident corrupti sint. Voluptatibus expedita delectus doloremque,
          sed illum laborum nobis, eos itaque rem cumque necessitatibus. Cum
          impedit fuga, voluptas porro itaque quasi dolor hic fugiat. Saepe
          cupiditate suscipit exercitationem a veritatis similique praesentium
          temporibus, amet accusamus quidem et, rerum ab magnam, magni quae
          placeat tempore expedita nam aperiam optio eligendi possimus eum
          incidunt ex. Nesciunt sapiente molestiae veniam alias rerum,
          aspernatur illo sequi possimus vitae voluptatibus ducimus officia
          assumenda harum reprehenderit debitis repellat quidem? Placeat ducimus
          nesciunt fugit earum eius.
        </div>
      </section>
    </main>
  );
}
