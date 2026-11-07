**Animators Hive Hub: Report of a web application for sharing and discussing animation**

**Level 5 Diploma in Computing.**

**Edem Angel Edem Hogan (P0013366)**

**AfriHUB**

Table of Contents

[Abstract 3](#_Toc1092601063)

[Introduction 5](#_Toc1542591369)

[1.1 The system developed 5](#_Toc1866787575)

[1.2 Justification for the method 5](#_Toc436904279)

[1.3 The solution that emerged 5](#_Toc1508875724)

[1.4 Aims 6](#_Toc1586595408)

[1.5 Objectives 6](#_Toc130808278)

[1.6 Overview of the remaining chapters 6](#_Toc962258018)

[Analysis 7](#_Toc362281992)

[2.1 Introduction 7](#_Toc546928619)

[2.2 Requirements 7](#_Toc1811034201)

[2.3 Use cases 9](#_Toc657841845)

[2.4 Architecture 9](#_Toc1700953530)

[2.4.2 Technical architectures for development and implementation. 10](#_Toc2076391557)

[2.4.3 Initial class diagram. 10](#_Toc1422029061)

[2.5 Conclusion. 10](#_Toc1340791703)

[Design 12](#_Toc1713699292)

[3.1 Introduction 12](#_Toc1656841071)

[3.2 Structural model 12](#_Toc624500183)

[3.3 Behavioural model 12](#_Toc946789005)

[3.3.1 Animation upload. 12](#_Toc849088860)

[3.3.2 Google sign-in with PKCE. 13](#_Toc239308844)

[3.3.3 Upvote toggle. 13](#_Toc909073099)

[3.4 Justification of design approach. 13](#_Toc1154622013)

[3.5 Conclusion. 14](#_Toc218393323)

[Implementation 15](#_Toc1152933707)

[4.1 Introduction 15](#_Toc648701948)

[4.2 Choice of programming language. 15](#_Toc1783193982)

[4.3 System cutover from development to implementation architecture. 15](#_Toc1515721206)

[4.4 Data migration. 16](#_Toc748740121)

[4.5 Training. 16](#_Toc455545612)

[4.6 Conclusion. 16](#_Toc460838621)

[Other Project Issues 17](#_Toc143847842)

[5.1 Introduction. 17](#_Toc174849540)

[5.2 Project management. 17](#_Toc897742900)

[5.3 Risk management. 17](#_Toc1652723567)

[5.4 Testing. 19](#_Toc1761444948)

[5.5 Conclusion. 19](#_Toc1028551178)

[Conclusion 21](#_Toc467497937)

[6.1 Summary. 21](#_Toc2123726941)

[6.2 Evaluation of the work. 21](#_Toc1575479798)

[6.3 Future development. 22](#_Toc131048490)

[6.4 Final reflection. 22](#_Toc634085138)

[References 23](#_Toc1128949680)

# Abstract

This report describes Animators Hive Hub, a web application that lets animators publish short animations and lets other people find, watch, up vote and comment on them. The scope covers account creation and sign-in with email or Google, an upload flow for video and thumbnails, a discover feed with sorting and search, animation pages, public and private profiles, playlists and communities. The work followed an iterative approach. A first build in June 2025 was a React single-page application on Supabase. After a long pause, the system was rebuilt from September 2026 as a SvelteKit application on Cloudflare Workers, with records in a D1 database and media in R2 storage. The analysis, design, implementation and testing are documented, together with project, risk and configuration management. Most functional aims were met, and the application is deployed. Community messaging, which the proposal listed, was not built. Of 83 black-box test cases, 80 passed, one failed and two could not be run.

Contents

I thank my supervisor for guidance on the proposal and on the build, and the staff at AfriHUB, the study centre, for their support during the course.

# Introduction

Animators publish their work on general platforms such as YouTube, Instagram and X, where animation competes with every other kind of video and post. Animators with a small audience are hard to find, and people who want animation have no single place to look. Animators Hive Hub is a web application in which animation is the subject, where animators can share their work, be found and discuss it.

## 1.1 The system developed

A visitor who is not signed in can open the landing page, animation pages, public profiles and the communities list. A signed-in member can upload an animation with a video, an optional thumbnail, a title, a description and an optional community. Members browse a feed sorted by newest or most up voted and searched by title and description. They up vote, comment, keep playlists, create and join communities, and edit their profiles. Owners can edit and delete their animations, and authors can delete their comments.

The proposal listed a feature to send a message to a community. It was not built. Discussion takes place through comments. There is no moderation, reporting, password reset or email verification, because the system sends no email.

## 1.2 Justification for the method

The project used an agile, iterative approach, with requirements prioritize by Mo Scow as used in the DSDM method (Agile Business Consortium, 2014; Cl egg and Barker, 1994). I chose it over waterfall. Porterville (2016) describes waterfall as fixing requirements before design, which suits stable requirements. This project's platform was not stable. The June 2025 React and Supabase build was left for fifteen months, and when work resumed in September 2026 the platform moved to Cloudflare, the code to SvelteKit, and the data layer changed twice before settling on D1 and R2. A complete plan written at the start would have been wrong by the time it was needed. The agile values of working software and of responding to change (Beck et al., 2001) describe that situation.

The method was applied loosely. The prototype was not time boxed. From September 2026 each block of work was a plan file whose steps needed a passing check before they were marked done. The critical plan ran about seventy minutes on 6 and 7 October 2026, and the next plan logged 27 steps on 7 October 2026.

## 1.3 The solution that emerged

The final system is a server-rendered application built with SvelteKit 2, Svelte 5 and TypeScript, styled with Tailwind CSS 4, and running as a Cloudflare Worker. Records are held in a D1 database named ahh, and video, thumbnail and avatar files in an R2 bucket named ahh. Google sign-in uses the arctic library with PKCE. Development runs the Vite server on a Linux computer with Node 22. The application is deployed at https://animators-hive-hub.apexlinks.workers.dev, and a push to main triggers Cloudflare Workers Builds.

## 1.4 Aims

To give animators a place to publish their animations and be found for their work.

To let visitors and members discover, comment on and up vote animations, and organize them into playlists and communities.

To give each animator control of their own work, including editing and deleting it.

To deliver a publicly deployed application that one developer can build and operate on a hosted platform.

## 1.5 Objectives

Each objective is measurable and due by 21 October 2026. Chapter 6 evaluates them.

O1: a member can upload a video of up to 50 MB with a title, description and thumbnail, and see it on the feed (end-to-end test; integration suite 1.1).

O2: a visitor can sign up with email and password, or sign in with Google, and sessions end on sign-out and password change (unit tests 1 and 2).

O3: the feed sorts by newest or most up voted, searches title and description, and pages 20 items (smoke script).

O4: members can up vote, comment, and delete their own comments (unit tests 4 and 5).

O5: members can create playlists and communities, and joining or leaving updates the member count (unit tests 6 and 7).

O6: rate limits of 30 authentication requests, 120 writes and 30 uploads per minute apply, invalid input is rejected, and other people's content returns 403 (integration suite 1.2).

O7: the application is deployed at a public URL from main (deployment check in plan/next.log).

## 1.6 Overview of the remaining chapters

Chapter 2 gives the analysis. Chapter 3 gives the design. Chapter 4 covers implementation, data migration and training. Chapter 5 covers project management, risk, configuration management and testing. Chapter 6 evaluates the work. The appendices hold the catalogs, descriptions, class definitions, test scripts, user guide and source overview.

# Analysis

### 2.1 Introduction

This chapter sets out what the system must do and how it is arranged. The requirements come from the proposal, the problem in Chapter 1, and my own use and testing of the working system. I carried out no interviews or surveys with animators, so the requirements reflect my judgement, not measured user needs. The full catalogue and use case descriptions are in Appendices A and B.

### 2.2 Requirements

**2.2.1 Functional requirements.**

Table 1 gives each functional requirement with its Mo Scow priority and any supporting non-functional requirement. Must covers accounts, upload, the feed, the animation page, up-votes and comments. Should adds organization and control. Community messaging is Could, as it was not expected to be finished. Won't covers reporting, moderation, follows, notifications, replies, administration, password reset and email verification. The last two are excluded because the system sends no email, as recorded in wip-plans/next.plan.json on 7 October 2026.

Functional Requirements:

| **ID** | **Functional requirement** | **Priority** | **Supporting non-functional requirement** |
| --- | --- | --- | --- |
| FR1 | Register with email, username and password | Must | NFR1, NFR4 |
| FR2 | Sign in and sign out with email and password | Must | NFR2, NFR3 |
| FR3 | Sign in with a Google account | Should | NFR2 |
| FR4 | Upload an animation: video, optional thumbnail, title, description, optional community | Must | NFR3, NFR5 |
| FR5 | Browse the discover feed with new and top sorts, search and load more | Must | NFR5 |
| FR6 | View an animation page with player, description and comments | Must | NFR6, NFR7 |
| FR7 | Edit or delete an animation the member owns | Should | NFR4 |
| FR8 | up vote an animation and remove the up vote | Must | NFR3, NFR4 |
| FR9 | Comment on an animation and delete one's own comment | Must | NFR4 |
| FR10 | Create, rename and delete playlists; add and remove animations | Should | NFR4 |
| FR11 | Browse, search, create, join and leave communities | Should | NFR4 |
| FR12 | View public profiles; edit one's own profile and avatar | Should | NFR4, NFR8 |
| FR13 | Change password and delete account | Should | NFR2 |
| FR14 | Send a message to a community | Could (not delivered) | NFR3 |

Fig 1: Functional Requirements.

Non-functional Requirements.

| **ID** | **Category** | **Requirement and measurable target** |
| --- | --- | --- |
| NFR1 | Security | Passwords are stored as PBKDF2-SHA256 hashes, 80,000 iterations, 256-bit output, random salt. |
| NFR2 | Security | The session token is 32 random bytes in an httpOnly, SameSite Lax cookie for 30 days. Only its SHA-256 hash is stored. Sessions end on sign-out, password change and deletion. |
| NFR3 | Security | Rate limits per 60 seconds: 30 authentication requests per IP, 120 writes per user, 30 uploads per user. Excess requests receive HTTP 429. |
| NFR4 | Integrity | Inputs are checked on the server against shared limits, such as a title of at most 100 characters. Owner-only actions return 403 to other users. |
| NFR5 | Performance | Feed pages hold at most 20 items; the offset is capped at 2,000; uploads are capped at 50 MB video and 5 MB image. These are design bounds; no timing benchmark was run. |
| NFR6 | Usability | The layout works at 375 by 667 pixels without horizontal scrolling. Light and dark themes are available. |
| NFR7 | Accessibility | Dialogs trap focus and close on Escape; icon-only buttons are named. The target is WCAG 2.1 (W3C, 2018). |
| NFR8 | Privacy | Public pages never show an email address. |
| NFR9 | Maintainability | Strict TypeScript, lint and check scripts, all SQL in one module, numbered migrations. |
| NFR10 | Deployability | A push to main produces a Cloudflare Workers build and deployment. |

Fig 2: Non-functional Requirements.

The security requirements follow the OWASP Top 10 (OWASP Foundation, 2021): NFR4 addresses broken access control, and NFR1 to NFR3 address authentication failures. NFR2 and NFR3 shape the design most, because they require a server-side session store and one rate limit applied in one place. NFR7 is a target, not a finished claim.

### 2.3 Use cases

Figure 3 is one use case diagram for the whole system. Guest is a visitor who is not signed in, Member is a signed-in animator, and Google is an external actor used only in sign-in. Member is a specialization of Guest, so it inherits the guest use cases. Each oval carries an identifier that matches Appendix B. The notation follows Fowler (2004).

![](#embedded-image)![](#embedded-image)![P0013366_UseCase_Diagram](#embedded-image)Fig 3: Use Case Diagram.

Discovery is open to visitors so that work can be found before sign-up. Changes to data are reserved for members. Each Must requirement maps to a use case: FR1 to UC1, FR2 to UC2 and UC15, FR4 to UC5, FR5 to UC4, FR6 to UC6, FR8 to UC8 and FR9 to UC9.

## 2.4 Architecture

### 2.4.1 Interfaces with other systems.

The system exchanges data with the browser, Google, Cloudflare's D1 and R2 services, and GitHub.

The browser sends forms, JSON and raw file bodies to the Worker, which returns HTML, JSON and media. Google sign-in is the only flow to an identity provider. The Worker redirects the browser to Google with a state value and a PKCE challenge, then exchanges the returned code with the stored verifier and reads the email, name, picture and email-verified flag. This is OAuth 2.0 (Hardt, 2012) with PKCE (Sakimura, Bradley and Agarwal, 2015). Only the Worker talks to D1 and R2. Clients see /media/ URLs whose keys are random UUIDs, never the bucket itself. No other external service receives data: there is no email, payment or analytic provider.

### 2.4.2 Technical architectures for development and implementation

The development hardware is one Linux computer with an x64 processor. The implementation has no hardware the author manages, because Cloudflare runs the Worker, D1 and R2. The software is Node 22, pnpm with a lockfile, SvelteKit 2.70.3, Svelte 5.57.1, Vite 7.3.6, TypeScript 5.9.3, Tailwind CSS 4.3.3, the Cloudflare adapter 7.2.9 and Wrangler 4.147.0. The Worker runs on the Workers runtime (Cloudflare, 2026c), records live in D1 (Cloudflare, 2026a) and media in R2 (Cloudflare, 2026b). Local emulation does not reproduce the production network, so network-dependent behaviour can differ.

### 2.4.3 Initial class diagram.

Figure 4 is the initial class diagram, derived from the use cases. It has eight classes, with no attributes or methods, as the module specifies.

![P0013366_Class_Diagram](#embedded-image)Fig 4: Class Diagram.

Several relationships were unclear. It was not settled whether a community's creator is also a member, or how the optional community association's multiplicities should be fixed against a schema. It was also unclear whether up-votes and comments needed identity of their own. Some classes were missing. There was no session class, because the first build relied on a hosted authentication service; server-side sessions became necessary on D1. Counts of votes, comments and members were absent and were added later for sorting. Media was held as URLs on Animation and User, so it needed no class. Messaging has no class because it was never designed.

## 2.5 Conclusion.

The analysis gave 14 functional requirements with Mo Scow priorities, ten system-wide requirements with measurable targets, one use case diagram and an initial class diagram. Three questions were left open: whether the creator is a member, the multiplicities of the community association, and the place of sessions, which the analysis had not considered. Chapter 3 answers the first two and adds the third. Community messaging was classed as Could and was not built.

# Design

## 3.1 Introduction

The structural model is the completed class diagram in Section 3.2. The behavioral model in Section 3.3 shows the three flows that cross the most components: animation upload, Google sign-in and the up vote toggle. I took each sequence from its use case and checked it against the route handler, data function and hook that implement it. Appendix C gives the full class definitions.

## 3.2 Structural model

Figure 5 is also the completed class diagram.

![P0013366_Class_Diagram](#embedded-image)Fig 5: Completed Class Diagram.

I moved from the initial diagram in four steps: I mapped each migration table to a class, checked each association against its foreign key and cascade rule, added the classes and attributes the schema needed, and documented the short column names in the SQL. The schema brought four changes. A session table was added, keyed by the SHA-256 hash of a random cookie value. Counters for up-votes and comments on animations, and for members on communities, were added and recomputed in the same batch as each write. Migration 0003 made membership explicit and backfilled every existing creator as a member, which settled the open question in Section 2.4.3. Deleting a user cascades to everything they own or joined, while deleting a community clears the community reference on its animations.

Below is the ER diagram of the website.

![P0013366_ER_Diagram](#embedded-image)Fig 6: ER diagram.

Figure 6 uses descriptive attribute names, with the table name in each class header. Primary and foreign keys are marked, and the three recomputed counters are labeled as counters. Media is not a class, so it appears only as the video, thumbnail and avatar URL attributes. The community avatar and banner columns exist but are never written. Section 6.3 records these gaps.

## 3.3 behavioral model

### 3.3.1 Animation upload.

Figure 7 shows the upload flow. The file goes first as a raw body to /api/media, which checks the content type and size, stores the file under a random UUID and returns its URL. The metadata then goes as JSON to /api/animations. The server checks the title and description, and confirms that each media URL matches the UUID pattern, so a client cannot point an animation at an arbitrary key. The flow was gathered from UC5, the upload components and the route handlers. If no thumbnail is chosen, the browser captures a still frame and uploads it the same way, and a failure there saves the animation without one.

![P0013366_Sequence_Upload](#embedded-image)Fig 7: Animation Upload Sequence.

A new community, if one is created, is made first and its identifier passed in the metadata request. A missing community reference returns a foreign key error, which the route maps to 404.

### 3.3.2 Google sign-in with PKCE.

The Google sign-in follows the OAuth 2.0 code grant (Hardt, 2012) with PKCE (Sakimura, Bradley and Agarwal, 2015). It was gathered from UC3, the two Google routes and the arctic client.

The state comparison stops forged callbacks. The verifier sits in an httpOnly cookie that lasts ten minutes. Unverified Google emails are rejected. Accounts are matched by lower-cased email, so an existing password account is signed in without its password. I accepted this because Google reports the address as verified, but it means control of the Google account controls the password account (Section 6.3).

### 3.3.3 up vote toggle.

The up vote toggle button, from UC8, changes only after the server answers, and a signed-out visitor sees a message with no request sent.

The hook runs before every route, so each write is session-checked and rate-limited in one place. The vote change and the recount are sent as one batch. A repeated up vote is ignored rather than rejected, which makes the toggle safe to repeat.

## 3.4 Justification of design approach.

Pages are rendered on the server, so the animation page's Open Graph tags are in the first response and a shared link previews without script. All records sit in one D1 database, which enforces foreign keys and cascades and supports batched statements, so the rules can be stated in the schema. All SQL is in src/lib/server/db.ts, which keeps the route handlers thin.

Sessions are stored in the database. The first version used a cookie signed with a secret, which cannot be ended on the server before it expires. A stored session lets sign-out, password change and deletion end sessions at once, at the cost of one lookup per request. Media stays in R2, separate from the records. Each owner-only action returns ok, not found or forbidden, and the route maps these to 200, 404 or 403, in line with the access-control guidance in OWASP (2021).

The denormalised counters are the weakest part. Each write must recount, and deleting a user does not recount other people's animations. Vector search with Gemini embeddings was tried and removed, because a title and description search met the requirement with one fewer external service and key.

## 3.5 Conclusion.

The design gives a structural model (Figure 5) and three behavioral models (Figures 6, 7 and 8). The structure was developed from the initial diagram by reading the schema, and the behaviour was checked against the code paths. The choices of server-rendered pages, one database, server-side sessions, separate media storage and one rate limit follow from Table 2. The counter recount and the Google account-linking rule are known weaknesses, evaluated in Chapter 6.

# Implementation

## 4.1 Introduction

This chapter covers the language, the cut-over, the data migration and training. The main build took place between 6 and 9 October 2026.

## 4.2 Choice of programming language.

The application is written in TypeScript with SvelteKit 2 and Svelte 5 (Svelte, 2026). TypeScript in strict mode (Microsoft, 2026) checks the data passed between server and browser. The validation rules in src/lib/rules.ts are imported by both routes and forms, so each limit is written once. SvelteKit keeps pages and JSON endpoints in one project, which suits the server-rendered design in Section 3.4, and its Cloudflare adapter targets the Workers runtime directly (Cloudflare, 2026c). Table 3 compares the options.

Options for the programming language and platform options.

| **Option** | **Strengths for this project** | **Reason not chosen** |
| --- | --- | --- |
| React and Vite single-page application (2025 prototype) | Familiar; already built | Pages render and fetch data in the browser, which made server-rendered pages harder |
| PHP and MySQL on a conventional web server | Common hosting; well documented | No edge runtime; the server must be maintained; storage built separately |
| TypeScript with SvelteKit on Cloudflare Workers (chosen) | Shared types and rules; server-rendered pages; D1 and R2 bindings | Fewer examples than React; the project follows the Svelte 5 runes API |

Fig 8: Options for programming language and platforms

## 4.3 System cut-over from development to implementation architecture.

The order for the schema, code, bindings and secrets moving from the development computer to the implementation is deliberate. A new migration is applied to the remote database before the push that depends on it, so deployed code never meets a schema it does not expect. The code then moves by git push to the mine remote on main, and Workers Builds deploys it. Each push is followed by a build check, and a failed build is attributed to the step that pushed it. The cut-over also removed the Vectorize binding, the embedding code and the Gemini secret. Secrets are set with wrangler secret put and never committed. This keeps one repository as the source of truth, makes rollback a revert and push, and keeps secrets out of the history.

## 4.4 Data migration.

No data from the 2025 prototype was migrated. Its Supabase project no longer resolves, so its rows cannot be exported, and the plan records that there was nothing to migrate. Accounts and posts from the first build are therefore not in this system, and this report does not attempt to recover them. The schema is three numbered migrations, applied locally and then remotely as the plan requires. The third backfills memberships from existing communities, which shows how a future migration must treat existing rows. The R2 bucket was newly created, and no media was copied into it.

## 4.5 Training.

The users are members, who upload and discuss, and visitors, who browse. The author is the only operator and learned the system by building it. No classroom or live training was given, and no external users were recruited, so there is no evidence of training outcomes.

## 4.6 Conclusion.

The system was built with TypeScript and SvelteKit and deployed by a push to main. The schema is three numbered migrations. The prototype's data was lost with its hosted project, and that loss is recorded. Training is a self-study guide, and no external users were trained.

# Other Project Issues

## 5.1 Introduction.

This chapter covers project management, risk, configuration management and testing. Each section describes the technique, why it was chosen, and the results the repository supports.

## 5.2 Project management.

Figure , from the proposal is a Gantt chart of the build from 26 September to 21 October 2026. It is a work breakdown in five sections: analysis and set-up, design, implementation, testing and documentation. Each bar is a task dated from the commits in the repository or from the timestamps in the plan logs, and each diamond is a milestone, such as the first deployment on push on 7 October 2026 and the proposal draft on 12 October 2026. The chart shows when work happened, not a plan: the proposal's work breakdown structure was a heading with no content, so no planned schedule exists to compare against.

The June 2025 prototype (two days, 37 commits) and the pause before September 2026 are left off the chart for scale. In the period shown, 73 commits were made: eight on 26 September, six on 6 October and 50 on 7 October, the day of the store switch, security, server rendering and ownership work. The remaining commits fall on 8, 9, 12, 14 and 20 October. The full test run on 21 October 2026 is the last item on the chart.

Work was managed through plan files in the repository. Each step has an outcome, instructions and a check command that must pass before the step is marked done, and completed steps are logged with a timestamp and commit hash. The critical plan had five steps; the next plan had nine groups and 27 logged lines, covering rendering, profiles, ownership, security, end-to-end tests and the production check. Scope decisions, such as excluding email, were written into the plans. The gate command stops a step being marked complete while its checks fail, and the files let the project resume after the pause.

## 5.3 Risk management.

I managed risk in four steps: identify, analyse by likelihood and impact, plan containment and contingency, and monitor through the plan gates and history.

Project Risks.

| **Risk** | **Source** | **Likelihood** | **Impact** | **Containment** | **Contingency** | **What actually happened** |
| --- | --- | --- | --- | --- | --- | --- |
| A hosted dependency becomes unavailable (Supabase; Google sign-in) | Contractual and environmental | Medium | High | Schema and rules kept in the repository | Rebuild the data layer on D1 | Supabase no longer resolves; nothing migrated. Google sign-in not seen to fail |
| Work stops for a long period | Management and process | Medium | High | Repository kept deploy-able; plans kept in the repository | Restart from repository and proposal | Happened: no commits from 16 June 2025 to 25 September 2026 |
| Scope grows beyond what can be finished | Management and process | High | Medium | Mo Scow priorities; Won't list; scope decisions in plans | Defer or drop items | Partly happened: vector search tried and removed; messaging not built |
| Checks fail unnoticed | Management and process | Medium | Medium | Gate command before each step is marked done | Fix the application, not the check | Lint was red before the critical plan; later made to pass |
| The author cannot work for a period | Personnel | Medium | High | Small commits; plans that record progress | Reduce scope to Must requirements | No effect recorded |
| A session secret is exposed | Technical | Medium | High | Secrets kept out of the repository | Rotate; fail closed; move sessions to the database | Happened: secret in plan notes, removed 7 October 2026 |
| Denormalised counts drift | Technical | Medium | Medium | Recount in the same batch as each write | Maintenance recount | Partly happened: user deletion does not recount others' animations |
| Uploads abused or files accumulate | Technical | Medium | Medium | 50 MB and 5 MB limits; 30 uploads per minute | Delete orphaned objects; tighten limits | No abuse recorded; orphaned R2 objects remain possible |

## 5.4 Testing.

Testing is black-box, as the module requires. The unit and integration scripts in Appendix D use the NCC format. Three automated checks support them: the end-to-end suite in tests/core.e2e.ts and tests/mobile.e2e.ts, which runs four browser tests; scripts/smoke.ts, which runs more than sixty named API checks and stops at the first failure; and the lint, check and build scripts. All of them, and every case in Appendix D, were run on 21 October 2026 against the local development server. The project has no unit test runner, so the unit tests are documented scripts, not automated code.

Test-evidence Summary.

| **Evidence** | **Scope** | **Status and result** |
| --- | --- | --- |
| End-to-end suite (4 tests) | Landing, sign-in focus, sign-up with upload, up vote and comment, phone layout | Passed, 4 of 4, on 21 October 2026 |
| Smoke script | API paging, search, votes, comments, playlists, communities, ownership, deletion | Passed: exit code 0, "smoke ok", on 21 October 2026 |
| Static checks | Formatting, types, build | Passed on 21 October 2026: svelte-check 0 errors and 0 warnings over 596 files; ESLint clean; production build succeeded |
| Unit test scripts 1 to 8 | Account through profile | 64 passed, 2 not run (Google sign-in cases 2.4 and 2.5) |
| Integration suites 1.1 to 1.3 | Functional flow, security, usability | 16 passed, 1 failed (case 1.2.1) |

Fig 9: Test Evidence Summary.

Two results need comment. Case 1.2.1 failed: in a first burst of 31 sign-in requests no request was refused, while in a second burst, after waiting 70 seconds, the 31st request received HTTP 429 as specified. Cloudflare's rate limiting binding counts requests per location and is approximate rather than exact, and the local emulation behaves the same way, so the limit slows an attacker but cannot be relied on to stop the 31st request. The write and upload limits (cases 1.2.2 and 1.2.3) passed. Cases 2.4 and 2.5 need a real Google sign-in, which cannot be automated against the local server; the Google flow was checked by reading the code and by case 1.9, which uses a Google-shaped account row. All tests ran on a local server, so they show the code is correct but do not measure production speed.

## 5.5 Conclusion.

Plan files with gate commands made the work check-able and resumable. The risks that happened were met with containment or contingency. Configuration was kept in git with conventional commits, numbered migrations and a lockfile. Testing passed 80 of 83 cases, with one rate-limit failure explained above and two Google cases that need a live account.

# Conclusion

## 6.1 Summary.

Animators Hive Hub is a deployed web application for sharing animation. Members upload animations with a video and thumbnail, up vote and comment, keep playlists, join communities and manage profiles. It was built with TypeScript and SvelteKit on Cloudflare, with D1 for records and R2 for media, and it was analyzed, designed, managed and tested as Chapters 2 to 5 describe.

Evaluation of Aims and Objectives.

| **Objective or proposal item** | **Assessment** | **Evidence** |
| --- | --- | --- |
| O1 Upload with title, description and thumbnail; see it on the feed | Met | Upload route and form in place; end-to-end upload test passed on 21 October 2026; integration suite 1.1 passed 6 of 6 |
| O2 Accounts by email and Google; sessions end on sign-out and password change | Met | Unit test 1 passed 9 of 9; unit test 2 passed 6, with the two live Google cases not run |
| O3 Feed sorted, searched and paged at 20 items | Met | Smoke script paging and search checks passed; integration case 1.1.2 passed |
| O4 up vote and comment; author-only comment deletion | Met | Unit tests 4 and 5 passed 15 of 15 |
| O5 Playlists and communities with member counts | Met | Unit tests 6 and 7 passed 17 of 17 |
| O6 Rate limits, validation and 403 for other people's content | Partly met | Suite 1.2 passed 6 of 7; validation and 403 checks passed; the authentication limit did not always refuse the 31st request (case 1.2.1) |
| O7 Deployed at a public URL from main | Met | Deployment recorded complete in plan/next.log on 7 October 2026; not re-checked |
| Proposal feature: send a message to a community | Not met | No messaging code; comments are the only discussion channel |

Fig 10: Evaluation of Aims and Objectives.

Six objectives are met with passing tests and one is partly met, because the authentication rate limit is approximate. Community messaging was not built, so the aim of connecting animators directly was met only in part, through the feed, profiles and communities.

## 6.2 Evaluation of the work.

The core flows work end to end, from sign-up through upload to comment. Passwords are hashed with PBKDF2, sessions can be ended on the server, rate limits sit in one place, and ownership is checked before each change. These decisions are appropriate for a system of this size, though no independent review was made. The plans and commits make the reasons for decisions traceable.

The limitations are as follows. Community messaging was not built, and there is no password reset or email verification. Replaced avatar files are not deleted from R2, and uploads never attached to an animation are never deleted. Deleting a user does not recount the up-votes and comments on other people's animations that the user affected. The community avatar and banner columns are never written. The video input accepts only mp4, webm and quicktime, while the server accepts any video type. The smoke script's forged-cookie check uses an HMAC construction the current code does not use, so it passes for a different reason from the one it describes. There are no automated unit tests; the Appendix D scripts were run by hand and by script. The authentication rate limit is approximate (case 1.2.1). The video player renders an empty caption track, because no caption file exists. The application has no help subsystem. Google sign-in to an address with a password account signs into that account, as described in Section 3.3.2.

## 6.3 Future development.

The next step is to run the Appendix D scripts, record the results, and add a unit test runner. Community messaging is the most important missing feature, since it is the one proposal feature that serves the aim of connecting animators. Password reset and email verification would follow once an email provider is chosen, and reporting and moderation would be needed before a wider launch. For the code, the priorities are removing orphaned R2 objects, recounting counters on user deletion, adding captions for uploaded videos, and adding an in-application help section.

## 6.4 Final reflection.

The most useful part of the process was the plan files with their gate commands. They stopped me marking work done when it was not, and they made a restart after a fifteen-month pause possible. In future I would decide the storage platform before building the first screen, record scope decisions as they are made, and run the test scripts as the code is written. The result is a working system that does most of what it set out to do, with its gaps stated in this chapter.

# References

Agile Business Consortium (2014) The DSDM Agile Project Framework Handbook. Ashford: Agile Business Consortium.

Beck, K. et al. (2001) Manifesto for Agile Software Development. Available at: https://agilemanifesto.org/ (Accessed: 21 October 2026).

Cl egg, D. and Barker, R. (1994) Case Method Fast-Track: A RAD Approach. Wokingham: Addison-Wesley.

Cloudflare (2026a) Cloudflare D1 documentation. Available at: https://developers.cloudflare.com/d1/ (Accessed: 21 October 2026).

Cloudflare (2026b) Cloudflare R2 documentation. Available at: https://developers.cloudflare.com/r2/ (Accessed: 21 October 2026).

Cloudflare (2026c) Cloudflare Workers documentation. Available at: https://developers.cloudflare.com/workers/ (Accessed: 21 October 2026).

Fowler, M. (2004) UML Distilled. 3rd edn. Boston: Addison-Wesley.

Hardt, D. (2012) The OAuth 2.0 Authorization Framework. RFC 6749. IETF.

Microsoft (2026) TypeScript documentation. Available at: https://www.typescriptlang.org/docs/ (Accessed: 21 October 2026).

OWASP Foundation (2021) OWASP Top 10:2021. Available at: https://owasp.org/Top10/ (Accessed: 21 October 2026).

Sakimura, N., Bradley, J. and Agarwal, N. (2015) Proof Key for Code Exchange by OAuth Public Clients. RFC 7636. IETF.

Porterville, I. (2016) Software Engineering. 10th edn. Harlow: Pearson.

Svelte (2026) SvelteKit documentation. Available at: https://svelte.dev/docs/kit (Accessed: 21 October 2026).

W3C (2018) Web Content Accessibility Guidelines (WCAG) 2.1. Available at: https://www.w3.org/TR/WCAG21/ (Accessed: 21 October 2026).