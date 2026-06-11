import { useEffect } from "react";
import { CONFIG } from "../../config";
import { useModal } from "../../context/ModalContext";
import { useApiList } from "../../hooks/useApiList";
import type { Project } from "../../types";
import { formatStatusClass } from "../../utils/formatStatus";
import { FALLBACK_IMAGE, resolveProjectImage } from "../../utils/imageLinks";
import { SkeletonCards } from "../Skeleton/Skeleton";

interface ProjectsProps {
  onCardsRendered?: () => void;
}

export function Projects({ onCardsRendered }: ProjectsProps) {
  const { data: projects, loaded } = useApiList<Project>(
    CONFIG.ENDPOINTS.PROJECTS,
  );
  const { openProjectDetail } = useModal();

  useEffect(() => {
    if (loaded && onCardsRendered) {
      requestAnimationFrame(() => onCardsRendered());
    }
  }, [loaded, onCardsRendered]);

  return (
    <section id="projects" className="projects-section container">
      <header className="section-header-left">
        <span className="section-eyebrow">03 · Projetos</span>
        <h2 className="section-title">Projetos Colaborativos</h2>
        <p className="section-subtitle">
          O que estamos construindo agora — código aberto, real, em produção.
        </p>
      </header>
      <div className="cards-grid">
        {!loaded || !projects ? (
          <SkeletonCards count={3} />
        ) : (
          projects.map((p, idx) => {
            const stack = Array.isArray(p.stack) ? p.stack.join(", ") : p.stack;
            const membros = Array.isArray(p.membros)
              ? p.membros.join(", ")
              : p.membros;

            return (
              <article
                key={`${p.titulo}-${idx}`}
                className="card-item project-card h-full"
              >
                {/* 
								<div className="project-image">
									<img
										src={imageSrc}
										alt={p.titulo}
										onError={e => {
											const target = e.currentTarget
											target.onerror = null
											target.src = FALLBACK_IMAGE
										}}
									/>
								</div>
								*/}
                <div className="h-full flex flex-col">
                  <span
                    className={`status-badge w-fit ${formatStatusClass(p.status)}`}
                  >
                    {p.status}
                  </span>

                  <div className="flex-1 flex flex-col">
                    <h3>{p.titulo}</h3>

                    <p className="text-sm">
                      {p.descricao_simples || p.descricao || ""}
                    </p>

                    <div className="mt-3 text-text-muted text-xs">
                      <strong className="text-text-main">Stack:</strong> {stack}
                    </div>

                    <div className="mt-3 text-text-muted text-xs">
                      <strong className="text-text-main">Membros:</strong>{" "}
                      {membros}
                    </div>
                  </div>

                  <div className="card-footer flex-wrap text-xs pt-3">
                    <button
                      className="link-btn primary"
                      onClick={() =>
                        openProjectDetail({
                          title: p.titulo,
                          body: (
                            p.descricao_detalhada ||
                            "Sem descrição detalhada disponível."
                          ).replace(/\n/g, "<br>"),
                        })
                      }
                    >
                      Saiba mais
                    </button>
                    {p.links?.deploy && (
                      <a
                        href={p.links.deploy}
                        target="_blank"
                        rel="noreferrer"
                        className="link-btn secondary"
                      >
                        Deploy
                      </a>
                    )}
                    {p.links?.github && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="link-btn secondary"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
