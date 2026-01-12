/**
 * Task Generator
 * Breaks down complex tasks into subtasks using LLM
 */

import type { TaskClassification, Subtask } from '../types';
import { SYSTEM_PROMPTS } from '../config/settings';

export interface TaskBreakdownInput {
  userRequest: string;
  classification: TaskClassification;
  context?: string;
  projectPath?: string;
}

export class TaskGenerator {
  private model: string;

  constructor(model: string = 'gpt-5.1-codex-max') {
    this.model = model;
  }

  /**
   * Break down a complex task into subtasks
   */
  async breakdown(input: TaskBreakdownInput): Promise<Subtask[]> {
    console.log('\n=== BREAKING DOWN TASK ===');
    console.log(`Complexity: ${input.classification.complexity}/5`);
    console.log(`Generating subtasks...`);

    // For simple tasks, create a single subtask
    if (input.classification.complexity <= 2) {
      const subtask = this.createSingleSubtask(input);
      console.log(`Created 1 subtask: "${subtask.title}"`);
      console.log('=========================\n');
      return [subtask];
    }

    // For complex tasks, break into multiple subtasks
    const subtasks = this.generateSubtasks(input);
    console.log(`Generated ${subtasks.length} subtasks:`);
    subtasks.forEach((st, i) => {
      console.log(`  ${i + 1}. ${st.title} (${st.executor})`);
    });
    console.log('=========================\n');

    return subtasks;
  }

  /**
   * Create a single subtask for simple requests
   */
  private createSingleSubtask(input: TaskBreakdownInput): Subtask {
    return {
      title: this.generateTitle(input.userRequest),
      description: this.generateDetailedDescription(input),
      acceptanceCriteria: this.generateAcceptanceCriteria(input),
      files: [],
      dependencies: [],
      estimatedTokens: input.classification.estimatedTokens,
      complexity: input.classification.complexity,
      executor: input.classification.recommendedExecutor,
    };
  }

  /**
   * Generate subtasks for complex requests
   */
  private generateSubtasks(input: TaskBreakdownInput): Subtask[] {
    const request = input.userRequest.toLowerCase();

    // Pattern-based subtask generation
    if (request.includes('authentication') || request.includes('auth')) {
      return this.generateAuthSubtasks(input);
    }

    if (request.includes('api') || request.includes('endpoint')) {
      return this.generateAPISubtasks(input);
    }

    if (request.includes('component') || request.includes('page')) {
      return this.generateComponentSubtasks(input);
    }

    if (request.includes('test')) {
      return this.generateTestSubtasks(input);
    }

    // Default: generic breakdown
    return this.generateGenericSubtasks(input);
  }

  /**
   * Generate authentication-related subtasks
   */
  private generateAuthSubtasks(input: TaskBreakdownInput): Subtask[] {
    return [
      {
        title: 'Set up authentication database schema',
        description: `
## Task: Set up Authentication Database Schema

### Context
Implementing user authentication for the application.

### Requirements
1. Create users table in Supabase
2. Add necessary indexes for email lookups
3. Set up RLS policies
4. Create profiles table for additional user data

### Files to Modify
- \`supabase/migrations/YYYYMMDD_create_auth.sql\` (create new)

### Database Schema
\`\`\`sql
-- users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
\`\`\`

### Acceptance Criteria
- [ ] Migration file created
- [ ] SQL syntax is valid
- [ ] Tables and indexes created successfully
- [ ] RLS policies defined (read: authenticated, insert: public)
`,
        acceptanceCriteria: [
          'Migration file created with proper naming convention',
          'SQL syntax is valid and follows Supabase best practices',
          'Users table created with id, email, password_hash, timestamps',
          'Profiles table created with foreign key to users',
          'Indexes created for email lookups',
          'RLS policies enable authenticated reads and public inserts',
        ],
        files: ['supabase/migrations/'],
        dependencies: [],
        estimatedTokens: 2000,
        complexity: 2,
        executor: 'glm',
      },
      {
        title: 'Implement registration API endpoint',
        description: `
## Task: User Registration Endpoint

### Context
Create POST /api/auth/register endpoint for user registration.

### Requirements
1. Validate email format and password strength
2. Hash passwords using bcrypt
3. Check for existing users
4. Return appropriate error messages
5. Generate JWT token on success

### Files to Modify
- \`src/api/auth/register.ts\` (create new)
- \`src/lib/crypto.ts\` (use existing utilities)

### Implementation
\`\`\`typescript
import { hash } from '@/lib/crypto';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return Response.json({ error: 'Email and password required' }, { status: 400 });
  }

  // Check existing user
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    return Response.json({ error: 'User already exists' }, { status: 409 });
  }

  // Hash password
  const passwordHash = await hash(password);

  // Create user
  const { error } = await supabase
    .from('users')
    .insert({ email, password_hash: passwordHash });

  if (error) {
    return Response.json({ error: 'Failed to create user' }, { status: 500 });
  }

  return Response.json({ success: true });
}
\`\`\`

### Acceptance Criteria
- [ ] Endpoint created at /api/auth/register
- [ ] Email validation implemented
- [ ] Password hashing with bcrypt
- [ ] Duplicate user check
- [ ] Proper error responses (400, 409, 500)
- [ ] Returns success response
`,
        acceptanceCriteria: [
          'POST endpoint accepts JSON with email and password',
          'Email format validation',
          'Password strength validation (min 8 chars)',
          'Passwords hashed with bcrypt (10 rounds)',
          'Returns 409 if user already exists',
          'Returns 400 for missing fields',
          'Returns 500 on database errors',
          'Returns 200 on success',
        ],
        files: ['src/api/auth/register.ts', 'src/lib/crypto.ts'],
        dependencies: ['Set up authentication database schema'],
        estimatedTokens: 2500,
        complexity: 3,
        executor: 'glm',
      },
      {
        title: 'Implement login API endpoint',
        description: `
## Task: User Login Endpoint

### Context
Create POST /api/auth/login endpoint for user authentication.

### Requirements
1. Verify user exists
2. Compare password hash
3. Generate JWT token
4. Return token on success
5. Handle errors appropriately

### Files to Modify
- \`src/api/auth/login.ts\` (create new)
- \`src/lib/crypto.ts\` (use existing verify function)
- \`src/lib/jwt.ts\` (use existing JWT utilities)

### Acceptance Criteria
- [ ] Login endpoint created at /api/auth/login
- [ ] Verifies user existence
- [ ] Validates password hash
- [ ] Generates JWT token on success
- [ ] Returns 401 for invalid credentials
- [ ] Token includes user ID and expiry
`,
        acceptanceCriteria: [
          'POST /api/auth/login endpoint created',
          'Validates email and password presence',
          'Queries users table by email',
          'Compares password hash using bcrypt.compare',
          'Generates JWT with 24hr expiry',
          'Returns 401 for invalid credentials',
          'Returns 200 with token on success',
        ],
        files: ['src/api/auth/login.ts'],
        dependencies: ['Implement registration API endpoint'],
        estimatedTokens: 2000,
        complexity: 3,
        executor: 'glm',
      },
      {
        title: 'Architecture review and security audit',
        description: `
## Task: Auth System Security Review

### Context
Review the authentication implementation for security issues.

### Review Checklist
1. SQL injection vulnerabilities
2. Password hashing strength
3. JWT token security
4. Rate limiting considerations
5. Input validation completeness
6. Error message information leakage
7. Session management
8. RLS policy correctness

### Files to Review
- All auth-related files created in previous tasks

### Deliverables
- Security audit document
- Recommendations for improvements
- Critical issues flagged

### Acceptance Criteria
- [ ] All auth files reviewed
- [ ] Security document created
- [ ] Critical issues identified (if any)
- [ ] Recommendations documented
- [ ] Code meets security best practices
`,
        acceptanceCriteria: [
          'All authentication code reviewed',
          'Security audit document created in docs/security/auth-review.md',
          'SQL injection analysis performed',
          'Password security verified (bcrypt, salt)',
          'JWT configuration reviewed',
          'Input validation completeness verified',
          'Error messages don\'t leak sensitive info',
          'RLS policies tested and verified',
        ],
        files: ['src/api/auth/', 'supabase/migrations/', 'docs/security/'],
        dependencies: ['Implement login API endpoint'],
        estimatedTokens: 3000,
        complexity: 5,
        executor: 'codex',
      },
    ];
  }

  /**
   * Generate API-related subtasks
   */
  private generateAPISubtasks(input: TaskBreakdownInput): Subtask[] {
    return [
      {
        title: 'Design API endpoints and data models',
        description: 'Design RESTful API structure and database schema',
        acceptanceCriteria: ['API endpoints documented', 'Data models defined', 'Routes planned'],
        files: [],
        dependencies: [],
        estimatedTokens: 1500,
        complexity: 3,
        executor: 'codex',
      },
      {
        title: 'Implement API endpoints',
        description: 'Create API endpoints following the design',
        acceptanceCriteria: ['All endpoints implemented', 'Error handling in place', 'Input validation'],
        files: ['src/api/'],
        dependencies: ['Design API endpoints and data models'],
        estimatedTokens: 3000,
        complexity: 3,
        executor: 'glm',
      },
      {
        title: 'Write API tests',
        description: 'Create comprehensive tests for API endpoints',
        acceptanceCriteria: ['Unit tests for each endpoint', 'Integration tests', 'Edge cases covered'],
        files: ['src/api/__tests__/'],
        dependencies: ['Implement API endpoints'],
        estimatedTokens: 2500,
        complexity: 2,
        executor: 'glm',
      },
    ];
  }

  /**
   * Generate component-related subtasks
   */
  private generateComponentSubtasks(input: TaskBreakdownInput): Subtask[] {
    return [
      {
        title: 'Design component structure and props',
        description: 'Plan component architecture and TypeScript interfaces',
        acceptanceCriteria: ['Component structure defined', 'Props interface designed', 'State planned'],
        files: [],
        dependencies: [],
        estimatedTokens: 1000,
        complexity: 3,
        executor: 'codex',
      },
      {
        title: 'Implement component UI',
        description: 'Build the component with React and TypeScript',
        acceptanceCriteria: ['Component renders correctly', 'TypeScript types correct', 'Styles applied'],
        files: ['src/components/'],
        dependencies: ['Design component structure and props'],
        estimatedTokens: 2000,
        complexity: 2,
        executor: 'glm',
      },
      {
        title: 'Add component tests',
        description: 'Write unit tests for the component',
        acceptanceCriteria: ['Component tested', 'Edge cases covered', 'Snapshots created'],
        files: ['src/components/__tests__/'],
        dependencies: ['Implement component UI'],
        estimatedTokens: 1500,
        complexity: 2,
        executor: 'glm',
      },
    ];
  }

  /**
   * Generate test-related subtasks
   */
  private generateTestSubtasks(input: TaskBreakdownInput): Subtask[] {
    return [
      {
        title: 'Review existing code and identify test gaps',
        description: 'Analyze codebase for test coverage',
        acceptanceCriteria: ['Coverage report generated', 'Gaps identified', 'Priority list created'],
        files: [],
        dependencies: [],
        estimatedTokens: 1500,
        complexity: 2,
        executor: 'codex',
      },
      {
        title: 'Write unit tests for uncovered code',
        description: 'Implement tests for identified gaps',
        acceptanceCriteria: ['Tests written', 'Passing locally', 'Coverage improved'],
        files: ['src/**/__tests__/'],
        dependencies: ['Review existing code and identify test gaps'],
        estimatedTokens: 4000,
        complexity: 2,
        executor: 'glm',
      },
    ];
  }

  /**
   * Generate generic subtasks
   */
  private generateGenericSubtasks(input: TaskBreakdownInput): Subtask[] {
    const numSubtasks = Math.min(7, Math.max(3, input.classification.complexity));

    return Array.from({ length: numSubtasks }, (_, i) => ({
      title: `Subtask ${i + 1}: ${this.generateTitle(input.userRequest)}`,
      description: this.generateDetailedDescription(input),
      acceptanceCriteria: this.generateAcceptanceCriteria(input),
      files: [],
      dependencies: i > 0 ? [`Subtask ${i}`] : [],
      estimatedTokens: Math.ceil(input.classification.estimatedTokens / numSubtasks),
      complexity: Math.min(5, input.classification.complexity - 1),
      executor: i === numSubtasks - 1 ? 'codex' : 'glm',
    }));
  }

  /**
   * Generate a task title
   */
  private generateTitle(request: string): string {
    const words = request.trim().split(/\s+/);
    return words
      .slice(0, 8)
      .map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join(' ');
  }

  /**
   * Generate detailed task description
   */
  private generateDetailedDescription(input: TaskBreakdownInput): string {
    return `
## Task: ${this.generateTitle(input.userRequest)}

### Context
${input.context || `Working on the Lumelle affiliate landing project.`}

### Requirements
${input.userRequest}

### Files to Modify
- Identify relevant files based on the task

### Implementation Notes
- Follow existing code patterns in the project
- Use TypeScript with proper typing
- Include error handling where appropriate
- Write clean, readable code
- Add comments for complex logic

### Acceptance Criteria
- See below
`;
  }

  /**
   * Generate acceptance criteria
   */
  private generateAcceptanceCriteria(input: TaskBreakdownInput): string[] {
    return [
      'Code follows project conventions',
      'TypeScript types are properly defined',
      'Error handling is implemented',
      'Code is tested (if applicable)',
      'Documentation is updated (if needed)',
    ];
  }
}
