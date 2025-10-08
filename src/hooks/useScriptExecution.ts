import { useState } from 'react';
import { useMutation } from 'urql';
import { EXECUTE_SCRIPT_MUTATION } from '../graphql/queries';
import { ScriptData } from '../types';
import { Bay } from '../types/sidebarTypes';

interface UseScriptExecutionProps {
  isValid: boolean;
  selectedBayObj: Bay | null;
  script: ScriptData;
}

interface UseScriptExecutionReturn {
  executing: boolean;
  execMessage: string | null;
  canExecute: boolean;
  executeScript: () => Promise<void>;
}

/**
 * Custom hook to manage script execution on a bay.
 * Handles loading states, error messages, and GraphQL mutation.
 */
export function useScriptExecution({
  isValid,
  selectedBayObj,
  script,
}: UseScriptExecutionProps): UseScriptExecutionReturn {
  const [executing, setExecuting] = useState(false);
  const [execMessage, setExecMessage] = useState<string | null>(null);
  const [, executeMutation] = useMutation(EXECUTE_SCRIPT_MUTATION);

  const canExecute = isValid && !!selectedBayObj?.id;

  async function executeScript() {
    if (!canExecute || !selectedBayObj) return;
    
    setExecuting(true);
    setExecMessage(null);
    
    try {
      const result = await executeMutation({
        bayId: selectedBayObj.id,
        script: JSON.stringify(script, null, 2),
      });
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      setExecMessage('✅ Script execution requested successfully');
    } catch (e: any) {
      setExecMessage(`❌ Failed: ${e.message || e}`);
    } finally {
      setExecuting(false);
      setTimeout(() => setExecMessage(null), 6000);
    }
  }

  return {
    executing,
    execMessage,
    canExecute,
    executeScript,
  };
}
