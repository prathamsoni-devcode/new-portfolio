import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST() {
  try {
    // 1. Insert Contact Info
    await supabase
      .from('contact_info')
      .delete()
      .gt('id', 0)

    await supabase
      .from('contact_info')
      .insert({
        email: 'pratham1108soni@gmail.com',
        phone: '+91-9079843800',
        location: 'Pune, India',
        github_url: 'https://github.com/prathamsoni-devcode',
        linkedin_url: 'https://linkedin.com/in/pratham1108soni',
        portfolio_url: 'https://prathamsoni.vercel.app',
        twitter_url: ''
      })

    // 2. Insert Skill Categories
    const { data: categories } = await supabase
      .from('skill_categories')
      .insert([
        { name: 'Languages', description: 'Programming Languages', display_order: 1 },
        { name: 'Frameworks', description: 'Web & Mobile Frameworks', display_order: 2 },
        { name: 'Cloud & DevOps', description: 'Cloud Platforms', display_order: 3 },
        { name: 'Databases', description: 'Database Systems', display_order: 4 },
        { name: 'AI & ML', description: 'AI and Machine Learning', display_order: 5 }
      ])
      .select()

    // 3. Insert Skills
    const skillsData = [
      { category_name: 'Languages', skills: [
        { name: 'Java', level: 'Expert', featured: true, order: 1 },
        { name: 'Kotlin', level: 'Advanced', featured: false, order: 2 },
        { name: 'Dart', level: 'Advanced', featured: false, order: 3 },
        { name: 'TypeScript', level: 'Expert', featured: true, order: 4 }
      ]},
      { category_name: 'Frameworks', skills: [
        { name: 'Spring Boot', level: 'Expert', featured: true, order: 1 },
        { name: 'Flutter', level: 'Advanced', featured: true, order: 2 },
        { name: 'Next.js', level: 'Expert', featured: true, order: 3 },
        { name: 'React', level: 'Expert', featured: true, order: 4 }
      ]},
      { category_name: 'Cloud & DevOps', skills: [
        { name: 'AWS', level: 'Advanced', featured: true, order: 1 },
        { name: 'Firebase', level: 'Advanced', featured: true, order: 2 },
        { name: 'Supabase', level: 'Advanced', featured: true, order: 3 },
        { name: 'Google Cloud', level: 'Advanced', featured: false, order: 4 }
      ]},
      { category_name: 'Databases', skills: [
        { name: 'PostgreSQL', level: 'Advanced', featured: true, order: 1 },
        { name: 'MongoDB', level: 'Advanced', featured: false, order: 2 },
        { name: 'Firebase Firestore', level: 'Advanced', featured: false, order: 3 }
      ]},
      { category_name: 'AI & ML', skills: [
        { name: 'RAG Systems', level: 'Advanced', featured: true, order: 1 },
        { name: 'LLM Integration', level: 'Advanced', featured: true, order: 2 }
      ]}
    ]

    for (const categoryGroup of skillsData) {
      const category = categories?.find(c => c.name === categoryGroup.category_name)
      if (!category) continue

      for (const skillData of categoryGroup.skills) {
        const { data: skill } = await supabase
          .from('skills')
          .insert({
            category_id: category.id,
            name: skillData.name,
            proficiency_level: skillData.level,
            is_featured: skillData.featured,
            display_order: skillData.order
          })
          .select()
          .single()

        // 4. Insert Sub-skills
        if (skillData.name === 'Spring Boot' && skill) {
          await supabase.from('skill_sub_skills').insert([
            { skill_id: skill.id, name: 'Spring Security', description: 'Authentication & Authorization', display_order: 1 },
            { skill_id: skill.id, name: 'REST APIs', description: 'RESTful API Design', display_order: 2 },
            { skill_id: skill.id, name: 'Microservices', description: 'Microservices Architecture', display_order: 3 },
            { skill_id: skill.id, name: 'JPA/Hibernate', description: 'ORM Framework', display_order: 4 }
          ])
        }
        if (skillData.name === 'Flutter' && skill) {
          await supabase.from('skill_sub_skills').insert([
            { skill_id: skill.id, name: 'Mobile Development', description: 'iOS & Android Apps', display_order: 1 },
            { skill_id: skill.id, name: 'Flutter Web', description: 'Web Applications', display_order: 2 },
            { skill_id: skill.id, name: 'State Management', description: 'Bloc & Provider', display_order: 3 }
          ])
        }
        if (skillData.name === 'Next.js' && skill) {
          await supabase.from('skill_sub_skills').insert([
            { skill_id: skill.id, name: 'Server Components', description: 'React Server Components', display_order: 1 },
            { skill_id: skill.id, name: 'API Routes', description: 'Backend APIs', display_order: 2 },
            { skill_id: skill.id, name: 'Static Generation', description: 'SSG & ISR', display_order: 3 }
          ])
        }
        if (skillData.name === 'PostgreSQL' && skill) {
          await supabase.from('skill_sub_skills').insert([
            { skill_id: skill.id, name: 'PostGIS', description: 'Geospatial Queries', display_order: 1 },
            { skill_id: skill.id, name: 'Advanced Queries', description: 'Complex SQL Optimization', display_order: 2 }
          ])
        }
        if (skillData.name === 'RAG Systems' && skill) {
          await supabase.from('skill_sub_skills').insert([
            { skill_id: skill.id, name: 'Vector Embeddings', description: 'Text & Code Embeddings', display_order: 1 },
            { skill_id: skill.id, name: 'Vector Databases', description: 'Pinecone, Weaviate, Chroma', display_order: 2 },
            { skill_id: skill.id, name: 'LLM Integration', description: 'OpenAI, Anthropic, Google', display_order: 3 }
          ])
        }
      }
    }

    // 5. Insert Project Categories
    const { data: projectCategories } = await supabase
      .from('project_categories')
      .insert([
        { name: 'Backend', description: 'Backend Development', display_order: 1 },
        { name: 'Frontend', description: 'Frontend Development', display_order: 2 },
        { name: 'Full Stack', description: 'Full Stack Projects', display_order: 3 }
      ])
      .select()

    // 6. Insert Projects
    const backendCategory = projectCategories?.find(c => c.name === 'Backend')
    if (backendCategory) {
      await supabase
        .from('projects')
        .insert({
          category_id: backendCategory.id,
          title: 'Uber Spring Boot Backend',
          description: 'Ride-booking system with geospatial queries and strategy pattern',
          long_description: 'Designed a ride-booking backend system using Spring Boot implementing Strategy Pattern for driver allocation and fare calculation. Features geospatial queries with PostGIS for proximity-based driver matching, JWT-based authentication with Spring Security, and comprehensive REST API endpoints.',
          github_url: 'https://github.com/prathamsoni-devcode/uber-backend',
          is_featured: true,
          start_date: '2023-06-01',
          end_date: '2023-12-31',
          display_order: 1
        })
    }

    // 7. Insert Experiences
    const { data: experience } = await supabase
      .from('experiences')
      .insert({
        job_title: 'Software Engineer',
        company_name: 'ConsultAdd',
        company_url: 'https://consultadd.com',
        description: 'Building AI-powered solutions and full-stack applications',
        start_date: '2024-02-01',
        is_current: true,
        display_order: 1
      })
      .select()
      .single()

    if (experience) {
      await supabase
        .from('experience_responsibilities')
        .insert([
          { experience_id: experience.id, responsibility: 'Developed LLM-powered RAG systems with vector embeddings', display_order: 1 },
          { experience_id: experience.id, responsibility: 'Built full-stack web applications with Next.js and Spring Boot', display_order: 2 },
          { experience_id: experience.id, responsibility: 'Designed and optimized database schemas for scalability', display_order: 3 }
        ])
    }

    return NextResponse.json({ success: true, message: 'Database seeded successfully' })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}
