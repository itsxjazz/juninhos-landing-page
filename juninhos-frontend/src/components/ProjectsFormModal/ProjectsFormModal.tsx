import { useState, type FormEvent } from "react";
import { CONFIG } from "../../config";
import { useLoading } from "../../context/LoadingContext";
import { useModal } from "../../context/ModalContext";
import { ApiService } from "../../services/api";
import type { ApiResponse, FeedbackType } from "../../types";
import { maskPhone } from "../../utils/phoneMask";
import { Feedback } from "../Form/Feedback";
import { Modal } from "../Modal/Modal";

type TeamMember = {
  fullName: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  discord: string;
};

type ProjectRegistrationFormData = {
  teamName: string;
  description: string;
  leaderIndex: number;
  members: TeamMember[];
};

const createEmptyMember = (): TeamMember => ({
  fullName: "",
  email: "",
  phone: "",
  github: "",
  linkedin: "",
  discord: "",
});

export function ProjectsFormModal() {
  const { projectFormOpen, closeProjectForm } = useModal();
  const { show: showLoading, hide: hideLoading } = useLoading();

  const [form, setForm] = useState<ProjectRegistrationFormData>({
    teamName: "",
    description: "",
    leaderIndex: 0,
    members: [createEmptyMember(), createEmptyMember(), createEmptyMember()],
  });

  const [feedback, setFeedback] = useState<{
    message: string;
    type: FeedbackType;
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [openMemberIndex, setOpenMemberIndex] = useState<number | null>(0);

  const reset = () => {
    setForm({
      teamName: "",
      description: "",
      leaderIndex: 0,
      members: [createEmptyMember(), createEmptyMember(), createEmptyMember()],
    });

    setFeedback(null);
    setSubmitting(false);
    setSuccessMessage(null);
  };

  const handleClose = () => {
    closeProjectForm();

    setTimeout(reset, 300);
  };

  const updateForm = <K extends keyof ProjectRegistrationFormData>(
    key: K,
    value: ProjectRegistrationFormData[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateMember = (
    index: number,
    field: keyof TeamMember,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      members: prev.members.map((member, i) =>
        i === index
          ? {
              ...member,
              [field]: value,
            }
          : member,
      ),
    }));
  };

  const addMember = () => {
    if (form.members.length >= 4) return;

    setForm((prev) => {
      const updatedMembers = [...prev.members, createEmptyMember()];

      setOpenMemberIndex(updatedMembers.length - 1);

      return {
        ...prev,
        members: updatedMembers,
      };
    });
  };

  const removeMember = (index: number) => {
    if (form.members.length <= 3) return;

    setForm((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
      leaderIndex:
        prev.leaderIndex >= index
          ? Math.max(0, prev.leaderIndex - 1)
          : prev.leaderIndex,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setFeedback(null);

    showLoading();

    try {
      const res = await ApiService.postData<ApiResponse>(
        CONFIG.ENDPOINTS.PROJECT_REGISTRATION,
        form,
      );

      setSuccessMessage(res.message);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Erro ao enviar inscrição";

      setFeedback({
        message: msg,
        type: "error",
      });

      setSubmitting(false);
    } finally {
      hideLoading();
    }
  };

  return (
    <Modal open={projectFormOpen} onClose={handleClose}>
      <div className="w-full">
        <h2 className="section-title">Inscrição de Equipe</h2>

        {successMessage ? (
          <div className="text-center py-4">
            <h3 className="text-primary mb-4">Inscrição enviada!</h3>

            <p className="text-text-muted mb-4">{successMessage}</p>

            <button className="btn-success-close" onClick={handleClose}>
              Entendido
            </button>
          </div>
        ) : (
          <>
            <p className="mb-8 text-center">
              Cada equipe deve possuir de 3 a 4 participantes obrigatoriamente.
              <br />
              Preencha corretamente os dados de todos os integrantes.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="team-name">Nome da Equipe *</label>

                <input
                  type="text"
                  id="team-name"
                  required
                  placeholder="Ex: Code Hunters"
                  value={form.teamName}
                  onChange={(e) => updateForm("teamName", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="project-description">Descrição do Projeto *</label>

                <textarea
                  id="project-description"
                  required
                  placeholder="Descreva brevemente o projeto que a equipe irá desenvolver..."
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                />
              </div>

              {form.members.map((member, index) => {
                const isOpen = openMemberIndex === index;

                return (
                  <div
                    key={index}
                    className="border border-white/10 rounded-xl mb-6 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenMemberIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <h3 className="text-lg font-semibold">
                        Participante {index + 1}
                      </h3>

                      <div className="flex items-center gap-4">
                        {form.members.length > 3 && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              removeMember(index);
                            }}
                            className="text-red-400 text-sm cursor-pointer"
                          >
                            Remover
                          </span>
                        )}

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#9CA3AF"
                          viewBox="0 0 256 256"
                          className={`transition-transform duration-300 ease-in-out ${
                            isOpen ? "rotate-180" : "rotate-0"
                          }`}
                        >
                          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5">
                        <div className="form-group">
                          <label>Nome Completo *</label>

                          <input
                            type="text"
                            required
                            placeholder="Nome completo"
                            value={member.fullName}
                            onChange={(e) =>
                              updateMember(index, "fullName", e.target.value)
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label>E-mail *</label>

                          <input
                            type="email"
                            required
                            placeholder="Mesmo e-mail cadastrado na Nortjobs"
                            value={member.email}
                            onChange={(e) =>
                              updateMember(index, "email", e.target.value)
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label>Telefone *</label>

                          <input
                            type="tel"
                            required
                            placeholder="(00) 00000-0000"
                            value={member.phone}
                            onChange={(e) =>
                              updateMember(
                                index,
                                "phone",
                                maskPhone(e.target.value),
                              )
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label>GitHub *</label>

                          <input
                            type="text"
                            required
                            placeholder="github.com/seuuser"
                            value={member.github}
                            onChange={(e) =>
                              updateMember(index, "github", e.target.value)
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label>LinkedIn *</label>

                          <input
                            type="text"
                            required
                            placeholder="linkedin.com/in/seuperfil"
                            value={member.linkedin}
                            onChange={(e) =>
                              updateMember(index, "linkedin", e.target.value)
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label>Discord *</label>

                          <input
                            type="text"
                            required
                            placeholder="@usuario"
                            value={member.discord}
                            onChange={(e) =>
                              updateMember(index, "discord", e.target.value)
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="leader"
                              checked={form.leaderIndex === index}
                              onChange={() => updateForm("leaderIndex", index)}
                            />

                            <span>Este participante é o líder da equipe</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <footer className="flex flex-col md:flex-row justify-center items-center gap-6 pt-4">
                {form.members.length < 4 && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={addMember}
                  >
                    Adicionar Participante
                  </button>
                )}

                <button
                  type="submit"
                  className="btn-submit"
                  disabled={submitting}
                >
                  {submitting ? "Enviando inscrição..." : "Enviar Inscrição"}
                </button>
              </footer>
            </form>
          </>
        )}

        {!successMessage && feedback && (
          <Feedback message={feedback.message} type={feedback.type} />
        )}
      </div>
    </Modal>
  );
}
