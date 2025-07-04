import banner from "@/assets/banner-2.jpg";
import mainBanner from "@/assets/banner.jpg";
import { CategoriesList } from "@/components/categories-list";
import { RelatedProducts } from "@/components/related-products";
import { Footer } from "@/components/structure/footer";
import { Header } from "@/components/structure/headers";
import { Banner } from "@/components/ui/banner";
import { Logo } from "@/utils/custom-icons";

export function Home() {

  return (
    <>
      <Header />
      <main>
        <section aria-label="main-banner-section" id="main-banner-section">
          <Banner
            key="main"
            image={{ src: mainBanner, alt: "banner-image" }}
            title={{
              content: <>
                Venha conhecer <br /> nossas promoções
              </>
            }}
            description={{
              content: <>
                Até <span className="text-primary">50 % off</span > em produtos selecionados
              </>
            }}
            action={{
              type: "function", label: "Ver produtos", href: "#"
            }}
          />
        </section>
        <div className="grid gap-[90px] justify-items-center">
          <CategoriesList />
          <RelatedProducts key="main" showFilters />
          <section aria-label="cards-banner-section" id="cards-banner-section" className="grid xl:grid-cols-2 gap-4 max-w-7xl min-[1700px]:max-w-[1550px] w-full px-6">
            <Banner
              key="second"
              secondary={true}
              contentPosition="end"
              className="rounded-3xl h-[350px]"
              image={{ src: banner, alt: "banner-image" }}
              title={{ content: "Parceiros" }}
              description={{

                content: "Que tal conhecer nossos parceiros?"
              }}
              action={{
                type: "function", label: "Confira", href: "#"
              }} />
            <Banner
              key="third"
              secondary={true}
              contentPosition="end"
              className="rounded-3xl h-[350px]"
              image={{ src: banner, alt: "banner-image" }}
              title={{ content: "Parceiros" }}
              description={{

                content: "Que tal conhecer nossos parceiros?"
              }}
              action={{
                type: "function", label: "Confira", href: "#"
              }} />
          </section>
          <section aria-label="marks-section" id="marks-section" className="grid gap-8 max-w-7xl min-[1700px]:max-w-[1550px] px-6">
            <h2 className="text-center text-3xl font-semibold text-blue">Navegue por marcas</h2>
            <nav className="flex items-center flex-wrap justify-center gap-10 py-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="size-52 rounded-full grid place-content-center shadow-lg">
                  <img src={Logo} alt="marca-logo" className="w-28" />
                </div>
              ))}
            </nav>
          </section>
          <RelatedProducts key="second" />
        </div>

      </main>
      <Footer />
    </>
  )
}
