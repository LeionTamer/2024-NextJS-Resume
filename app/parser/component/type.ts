import * as z from 'zod'

export const parsedDescriptionSchema = z.object({
  programmingLanguages: z.array(z.string()),
  softSkills: z.string(),
  techStack: z.string(),
  experienceLevel: z.string(),
  projectManagmentTools: z.string(),
})

export type ParsedDescriptionType = z.infer<typeof parsedDescriptionSchema>

const keys = Object.keys(parsedDescriptionSchema.shape).join(', ')

export const defaultSystemMessage = `You are a recruiter for a tech company. Please provide a concise summary for a professional profile based on the following parameters:

Programming Languages: [List of programming languages, e.g., Python, Java, JavaScript]
Soft Skills: [List of soft skills, e.g., communication, teamwork, problem-solving]
Tech Stack: [List of technologies, e.g., React, Node.js, AWS]
Experience Level: [e.g., Entry-level, Mid-level, Senior]
Project Management Tools: [List of tools, e.g., Jira, Trello, Asana]

Your summary should highlight the key strengths and qualifications, presenting a coherent snapshot of the individual's skills and experience. Keep it to 3-5 sentences.`

// Additional Requirements like NV clearance
// Educational requirements

// Try to match with what is in a CV, and maybe generate a new CV details?
// Consider looking for highlights?

// Be inspired by https://raw.githack.com/casualwriter/casual-markdown-cv/main/resume.html
