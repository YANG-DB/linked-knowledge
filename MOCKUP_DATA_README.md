# Mockup CSV Files - Data Alignment Guide

This document explains the mockup CSV files created to align with the existing `Connections.csv` and `Positions.csv` data.

## 📋 File Overview

### 1. Publications.csv (8 entries)
**Purpose:** Track published articles, blog posts, and technical writing

**Data Alignment:**
- Publication dates align with career timeline (2008-2022)
- Topics match position descriptions (OpenSearch, GraphQL, ML pipelines, etc.)
- Publishers reflect realistic tech blogs (Medium, InfoQ, Netflix Tech Blog, etc.)
- Each publication corresponds to work done at specific companies

**Key Connections:**
- "Building Knowledge Graphs with OpenSearch" (2022) → Amazon position
- "Real-time Analytics at Scale" (2021) → Meta position
- "TensorFlow Pipelines for Production ML" (2019) → Google position
- "Microservices Architecture for Enterprise Scale" (2017) → Microsoft position

---

### 2. Projects.csv (9 entries)
**Purpose:** Open-source and major projects throughout career

**Data Alignment:**
- Project dates match employment periods exactly
- Technologies mentioned in projects align with position descriptions
- Each project represents major work from each company
- GitHub URLs are realistic placeholders

**Key Connections:**
- OpenSearch Knowledge Graph Engine (2022-present) → Amazon
- Real-time Analytics Platform (2019-2021) → Meta
- ML Pipeline Automation Framework (2016-2019) → Google
- Azure DevOps Enhancement Suite (2014-2016) → Microsoft
- iOS App Store SDK (2011-2013) → Apple
- Netflix Personalization Engine (2009-2011) → Netflix
- Creative Cloud Collaboration Tools (2007-2009) → Adobe
- Network Monitoring Automation (2006) → Cisco (intern)

---

### 3. Skills.csv (97 skills)
**Purpose:** Comprehensive technical skill set

**Categories:**
- **Languages:** Python, Java, JavaScript, TypeScript, Go, Rust, C++, Scala, Kotlin
- **Frontend:** React, Node.js
- **APIs:** GraphQL, REST APIs, gRPC
- **Data Infrastructure:** Kafka, OpenSearch, Elasticsearch, PostgreSQL, MongoDB, Redis, Cassandra, Neo4j
- **ML/AI:** TensorFlow, PyTorch, Kubeflow, MLflow
- **DevOps:** Docker, Kubernetes, AWS, GCP, Azure, Terraform, Ansible
- **Patterns:** Microservices, Distributed Systems, Event-Driven Architecture
- **Soft Skills:** Technical Leadership, Mentoring, Code Review

**Alignment:** Skills reflect progression through positions - early skills (Java, Spring) from earlier positions, modern skills (Rust, GraphQL) from recent roles

---

### 4. Recommendations.csv (10 entries)
**Purpose:** LinkedIn recommendations received from colleagues

**Data Alignment:**
- Recommenders are actual people from `Connections.csv`
- Companies match where they work in Connections
- Dates align with when you worked together
- Content references specific projects and technologies from positions

**Key Recommendations:**
1. **Matthew Jackson** (Microsoft) - Mentions Azure DevOps work, 45% performance improvement
2. **Laura Cooper** (Salesforce) - References Meta real-time analytics, 50M+ events/second
3. **Nathan Diaz** (New Relic) - Discusses Google ML pipelines, 98% test coverage
4. **Caroline Hernandez** (New Relic) - Mentorship at Google, 10TB+ data processing
5. **Stephanie Young** (Snyk) - Amazon knowledge graph engine
6. **Kyle Myers** (VMware) - Apple iOS framework, 70% API call reduction
7. **Jonathan Wood** (DataDog) - Netflix recommendation engine, A/B testing
8. **Carlos Diaz** (Oracle) - Adobe Creative Cloud collaboration
9. **Rebecca Edwards** (MongoDB) - Cisco internship mentorship
10. **Tyler Smith** (Infosys) - Recent OpenSearch work

---

### 5. Invitations.csv (20 entries)
**Purpose:** Connection request history (incoming and outgoing)

**Data Alignment:**
- People mentioned are from `Connections.csv`
- Dates match or slightly precede "Connected On" dates
- Mix of INCOMING (10) and OUTGOING (10) invitations
- Messages reference actual work and shared interests
- Timeline spans from 2006 to 2023

**Direction Breakdown:**
- **OUTGOING:** Proactive networking at new companies, after conferences, welcoming newcomers
- **INCOMING:** People reaching out after seeing blog posts, open-source work, seeking mentorship

---

### 6. Messages.csv (20 messages, 10 conversations)
**Purpose:** LinkedIn message conversations

**Data Alignment:**
- Participants are from `Connections.csv`
- Topics reference actual projects and technologies from positions
- Dates are realistic (2019-2023 for recent activity)
- Mix of conversation types:
  - **Technical discussions** (7): Knowledge graphs, GraphQL, Kafka, ML pipelines
  - **Job opportunities** (2): Recruiter outreach from Stripe, Databricks
  - **Mentorship** (2): Helping others, thanking for help
  - **Collaboration** (2): Open source, conference speaking

**Conversation Partners:**
- Laura Cooper (Salesforce) - Knowledge graph discussion
- Matthew Jackson (Microsoft) - GraphQL federation
- Nathan Diaz (New Relic) - TensorFlow pipelines
- Tyler Smith (Infosys) - Mentorship request
- Stephanie Young (Snyk) - Open source collaboration
- Caroline Hernandez (New Relic) - Thank you for recommendation
- Carlos Rogers (Elastic) - Kafka questions

---

### 7. Learning.csv (20 courses)
**Purpose:** Online courses and learning activities

**Data Alignment:**
- Course topics match technologies used in positions
- Completion dates precede or align with when skills were applied
- Notes reference actual projects from `Projects.csv`
- Mix of completed (15) and in-progress (5) courses
- Progression from basics (2010) to advanced topics (2023)

**Learning Timeline:**
- **2006-2010:** Fundamentals (Python, ML basics, React)
- **2011-2016:** Scaling skills (Microservices, iOS, Distributed Systems)
- **2017-2019:** Modern stack (Kubernetes, GraphQL, Data Engineering)
- **2020-2023:** Advanced topics (Advanced K8s, Graph DBs, Leadership, Rust)

**Note Field Examples:**
- "Applied to OpenSearch knowledge graph project"
- "Used for Meta analytics platform"
- "Foundation for Google ML pipelines"

---

## 🔗 Cross-Reference Map

### People in Multiple Files
1. **Matthew Jackson** (Microsoft)
   - Connections.csv: Connected May 27 2010
   - Recommendations.csv: Wrote recommendation Jun 15 2016
   - Invitations.csv: You invited him May 20 2016
   - Messages.csv: Asked about GraphQL Mar 10 2022

2. **Laura Cooper** (Salesforce)
   - Connections.csv: Connected Sep 14 2010
   - Recommendations.csv: Wrote recommendation Sep 8 2021
   - Invitations.csv: You invited her Sep 1 2021
   - Messages.csv: Knowledge graph discussion Nov 15 2023

3. **Nathan Diaz** (New Relic)
   - Connections.csv: Connected Aug 20 2010
   - Recommendations.csv: Wrote recommendation Jan 22 2019
   - Invitations.csv: He invited you Jan 15 2019
   - Messages.csv: TensorFlow advice May 18 2019

### Technology Cross-References
- **OpenSearch/Knowledge Graphs:**
  - Positions: Amazon (2022-present)
  - Projects: OpenSearch Knowledge Graph Engine
  - Publications: Building Knowledge Graphs article
  - Skills: opensearch, Knowledge Graphs
  - Messages: Laura Cooper discussion
  - Recommendations: Stephanie Young mention

- **GraphQL:**
  - Positions: Meta (GraphQL federation)
  - Projects: GraphQL Federation Gateway
  - Publications: GraphQL Federation Best Practices
  - Skills: GraphQL, GraphQL Federation
  - Learning: GraphQL Best Practices course
  - Messages: Matthew Jackson question

- **Machine Learning:**
  - Positions: Google (ML pipelines), Netflix (recommendations)
  - Projects: ML Pipeline Automation, Netflix Personalization Engine
  - Publications: TensorFlow Pipelines article
  - Skills: TensorFlow, PyTorch, Kubeflow, MLflow
  - Learning: TensorFlow, Neural Networks courses
  - Recommendations: Nathan Diaz, Jonathan Wood mentions

---

## 📊 Data Statistics

| File | Entries | Date Range | Key Feature |
|------|---------|------------|-------------|
| Publications.csv | 8 | 2008-2022 | Aligned with major projects |
| Projects.csv | 9 | 2006-present | One per company period |
| Skills.csv | 97 | N/A | Comprehensive tech stack |
| Recommendations.csv | 10 | 2006-2023 | From actual connections |
| Invitations.csv | 20 | 2006-2023 | 50/50 incoming/outgoing |
| Messages.csv | 20 | 2019-2023 | 10 conversations |
| Learning.csv | 20 | 2010-2023 | 75% completion rate |

---

## 🎯 Visualization Opportunities

These mockup files enable rich visualizations:

1. **Publications Timeline** - Show publications on career timeline
2. **Project Duration Bars** - Overlay projects on positions
3. **Skills Word Cloud** - Size by relevance or endorsements
4. **Recommendation Network** - Who recommended you, from which companies
5. **Message Frequency Heatmap** - Communication patterns over time
6. **Invitation Direction Chart** - Networking growth analysis
7. **Learning Velocity Chart** - Courses completed over time
8. **Cross-Reference Graph** - People who appear in multiple contexts

---

## 💡 Usage Notes

1. **Realistic Data:** All data is internally consistent and realistic
2. **Privacy Safe:** All names from existing Connections.csv, no new PII
3. **Technology Accurate:** Technologies match actual career progression
4. **Timeline Aligned:** All dates are logically consistent across files
5. **Ready to Use:** Can be loaded directly into the application

---

## 🚀 Next Steps

1. Implement download buttons for sample files (similar to Connections/Positions)
2. Build visualization tabs for each data type
3. Add cross-referencing features (e.g., click person → see all interactions)
4. Create integrated timeline showing all activities
