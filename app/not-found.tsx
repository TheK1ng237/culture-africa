import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-noir px-5 pb-24 pt-44 text-ivoire sm:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-5xl md:text-6xl">Cette page est introuvable.</h1>
        <p className="mt-5 text-lg text-beige/85">Le lien est peut-être incorrect, ou le contenu a été déplacé. Reprenez la route depuis l’accueil.</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/" className="rounded-full bg-or px-6 py-3 font-medium text-noir hover:bg-ocre">Retour à l’accueil</Link>
          <Link href="/countries" className="rounded-full border border-beige/40 px-6 py-3 hover:border-or hover:text-or">Voir les pays</Link>
        </div>
      </div>
    </section>
  );
}
