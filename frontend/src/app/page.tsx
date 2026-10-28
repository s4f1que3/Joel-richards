export const dynamic = "force-dynamic";

import { Mail, Phone, Instagram, Linkedin, ArrowRight, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getData() {
  const [articlesRes, bioRes, contactRes, resumeRes] = await Promise.allSettled([
    fetch(`${API}/articles`, { cache: "no-store" }),
    fetch(`${API}/bio`, { cache: "no-store" }),
    fetch(`${API}/contact`, { cache: "no-store" }),
    fetch(`${API}/resume`, { cache: "no-store" }),
  ]);

  const articles = articlesRes.status === "fulfilled" && articlesRes.value.ok
    ? await articlesRes.value.json().catch(() => [])
    : [];
  const bio = bioRes.status === "fulfilled" && bioRes.value.ok
    ? await bioRes.value.json().catch(() => null)
    : null;
  const contact = contactRes.status === "fulfilled" && contactRes.value.ok
    ? await contactRes.value.json().catch(() => null)
    : null;
  const resumeData = resumeRes.status === "fulfilled" && resumeRes.value.ok
    ? await resumeRes.value.json().catch(() => null)
    : null;
  const resumeUrl: string | null = resumeData?.file?.asset?.url ?? null;

  return { articles: Array.isArray(articles) ? articles : [], bio, contact, resumeUrl };
}

export default async function HomePage() {
  const { articles, bio, contact, resumeUrl } = await getData();

  const bioContent: string | undefined = bio?.[0]?.content || bio?.content;
  const email: string | undefined = contact?.[0]?.email || contact?.email;
  const phone: string | undefined = contact?.[0]?.phone || contact?.phone;
  const instagram: string | undefined = contact?.[0]?.instagram || contact?.instagram;
  const linkedin: string | undefined = contact?.[0]?.linkedin || contact?.linkedin;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="pt-14">
        {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-32 pb-28">
          <div className="max-w-2xl">
            <p className="text-primary text-sm font-medium mb-4">Hi, I&apos;m</p>
            <h1 className="text-5xl sm:text-6xl font-semibold text-text-primary tracking-tight leading-[1.05] mb-6">
              Joel Richards
            </h1>
            {bioContent && (
              <p className="text-text-secondary text-lg leading-relaxed max-w-md mb-10 line-clamp-4">
                {bioContent}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#articles"
                className="bg-primary text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
              >
                View my work <ArrowRight size={15} />
              </a>
              <a
                href="#contact"
                className="border border-border-color text-text-primary px-6 py-3 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section id="articles" className="bg-surface">
          <div className="max-w-5xl mx-auto px-6 py-28">
            <p className="text-accent-dark text-sm font-medium mb-3">Writing</p>
            <h2 className="text-3xl font-semibold text-text-primary mb-12">Articles</h2>

            {articles.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article: { _id: string; Title: string; content?: string; thumbnailUrl?: string }) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-sm">No articles yet.</p>
            )}
          </div>
        </section>

        {/* About */}
        {bioContent && (
          <section className="max-w-5xl mx-auto px-6 py-28">
            <p className="text-accent-dark text-sm font-medium mb-3">About</p>
            <h2 className="text-3xl font-semibold text-text-primary mb-8">The story so far</h2>
            <p className="max-w-2xl text-text-secondary text-base leading-relaxed whitespace-pre-wrap">
              {bioContent}
            </p>
          </section>
        )}

        {/* Resume */}
        {resumeUrl && (
          <section className="max-w-5xl mx-auto px-6 pb-28">
            <div className="border-t border-border-color pt-16">
              <p className="text-accent-dark text-sm font-medium mb-3">Experience</p>
              <h2 className="text-3xl font-semibold text-text-primary mb-4">Resume / CV</h2>
              <p className="text-text-secondary text-sm mb-8">
                Download my resume to learn more about my experience and background.
              </p>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border-color text-text-primary px-5 py-2.5 rounded-full text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                <Download size={15} />
                Download CV
              </a>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" className="bg-surface">
          <div className="max-w-5xl mx-auto px-6 py-28">
            <p className="text-accent-dark text-sm font-medium mb-3">Get in touch</p>
            <h2 className="text-3xl font-semibold text-text-primary mb-12">Contact</h2>
            {contact ? (
              <div className="flex flex-wrap gap-4">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 bg-white rounded-2xl px-6 py-5 hover:shadow-md transition-shadow group"
                  >
                    <Mail size={20} className="text-primary" />
                    <div>
                      <p className="text-xs text-text-secondary mb-0.5">Email</p>
                      <p className="text-sm text-text-primary font-medium group-hover:text-primary transition-colors">
                        {email}
                      </p>
                    </div>
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 bg-white rounded-2xl px-6 py-5 hover:shadow-md transition-shadow group"
                  >
                    <Phone size={20} className="text-primary" />
                    <div>
                      <p className="text-xs text-text-secondary mb-0.5">Phone</p>
                      <p className="text-sm text-text-primary font-medium group-hover:text-primary transition-colors">
                        {phone}
                      </p>
                    </div>
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-2xl px-6 py-5 hover:shadow-md transition-shadow group"
                  >
                    <Instagram size={20} className="text-primary" />
                    <div>
                      <p className="text-xs text-text-secondary mb-0.5">Instagram</p>
                      <p className="text-sm text-text-primary font-medium group-hover:text-primary transition-colors">
                        View profile
                      </p>
                    </div>
                  </a>
                )}
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-2xl px-6 py-5 hover:shadow-md transition-shadow group"
                  >
                    <Linkedin size={20} className="text-primary" />
                    <div>
                      <p className="text-xs text-text-secondary mb-0.5">LinkedIn</p>
                      <p className="text-sm text-text-primary font-medium group-hover:text-primary transition-colors">
                        View profile
                      </p>
                    </div>
                  </a>
                )}
              </div>
            ) : (
              <p className="text-text-secondary text-sm">Contact information not available.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
