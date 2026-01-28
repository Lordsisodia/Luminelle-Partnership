/**
 * Lumelle Agent Hub - Coding Agent
 * Handles code writing, debugging, and refactoring tasks
 */

import { BaseAgent } from '../core/agent.js';
import { getSystemPrompt } from '../core/prompts.js';
import type { AgentConfig, Task, Tool } from '../core/types.js';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// File operation tools
const fileReadTool: Tool = {
  name: 'read_file',
  description: 'Read the contents of a file',
  inputSchema: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'Absolute or relative path to the file',
      },
    },
    required: ['path'],
  },
  handler: async (params) => {
    try {
      const path = resolve(process.cwd(), params.path);
      const content = readFileSync(path, 'utf-8');
      return { success: true, content };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
};

const fileWriteTool: Tool = {
  name: 'write_file',
  description: 'Write content to a file',
  inputSchema: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'Absolute or relative path to the file',
      },
      content: {
        type: 'string',
        description: 'Content to write to the file',
      },
    },
    required: ['path', 'content'],
  },
  handler: async (params) => {
    try {
      const path = resolve(process.cwd(), params.path);
      writeFileSync(path, params.content, 'utf-8');
      return { success: true, message: `File written: ${path}` };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
};

const searchFilesTool: Tool = {
  name: 'search_files',
  description: 'Search for files by pattern',
  inputSchema: {
    type: 'object',
    properties: {
      pattern: {
        type: 'string',
        description: 'Glob pattern to search for (e.g., "**/*.tsx")',
      },
    },
    required: ['pattern'],
  },
  handler: async (params) => {
    try {
      // This would integrate with the project's file system
      // For now, return a placeholder
      return {
        success: true,
        message: 'Search functionality to be implemented',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
};

export class CodingAgent extends BaseAgent {
  constructor() {
    const config: AgentConfig = {
      role: 'coding',
      name: 'Coding Agent',
      description: 'Writes, debugs, and refactors code',
      modelTier: 'standard',
      systemPrompt: getSystemPrompt('coding'),
      tools: [fileReadTool, fileWriteTool, searchFilesTool],
      capabilities: [
        'write_code',
        'debug',
        'refactor',
        'file_operations',
        'git_operations',
      ],
      maxConcurrentTasks: 3,
    };

    super(config);
  }

  /**
   * Execute a coding task
   */
  protected async executeTask(task: Task): Promise<any> {
    console.log(`[CodingAgent] Executing task: ${task.description}`);

    // Build context from task
    const contextPrompt = this.buildContextPrompt(task);

    // Call LLM with task and context
    const response = await this.callLLM([
      {
        role: 'user',
        content: contextPrompt,
      },
    ]);

    return {
      success: true,
      result: response,
      agent: this.config.name,
    };
  }

  /**
   * Build the context prompt for the LLM
   */
  private buildContextPrompt(task: Task): string {
    const parts = [
      `Task: ${task.description}`,
      '',
      'Context:',
    ];

    // Add any relevant context from the task
    if (task.context) {
      if (task.context.files) {
        parts.push('\nReferenced files:');
        for (const file of task.context.files) {
          parts.push(`  - ${file}`);
        }
      }

      if (task.context.previousChanges) {
        parts.push('\nPrevious changes:');
        parts.push(task.context.previousChanges);
      }
    }

    parts.push('');
    parts.push('Please complete this task using the available tools.');
    parts.push('Explain your changes clearly when done.');

    return parts.join('\n');
  }

  /**
   * Handle file operations specifically
   */
  async readFile(path: string): Promise<string> {
    const result = await fileReadTool.handler({ path });
    if (result.success) {
      return result.content;
    }
    throw new Error(result.error || 'Failed to read file');
  }

  async writeFile(path: string, content: string): Promise<void> {
    const result = await fileWriteTool.handler({ path, content });
    if (!result.success) {
      throw new Error(result.error || 'Failed to write file');
    }
  }
}
