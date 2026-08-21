import { useState, useCallback } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";

type Pending = { title: string; body: string; confirmLabel: string; onConfirm: () => Promise<unknown> | unknown };

/**
 * Destructive actions are never one click. `ask()` opens the dialog; the
 * returned element must be rendered by the caller.
 */
export function useConfirm() {
  const [pending, setPending] = useState<Pending | null>(null);
  const [working, setWorking] = useState(false);

  const ask = useCallback(
    (options: { title: string; body: string; confirmLabel?: string; onConfirm: () => Promise<unknown> | unknown }) =>
      setPending({ confirmLabel: "Delete", ...options }),
    [],
  );

  const close = useCallback(() => {
    if (!working) setPending(null);
  }, [working]);

  const dialog = (
    <Modal
      open={pending !== null}
      title={pending?.title ?? ""}
      onClose={close}
      width="max-w-md"
      footer={
        <>
          <Button variant="secondary" onClick={close} disabled={working}>
            Cancel
          </Button>
          <Button
            variant="danger"
            loading={working}
            onClick={async () => {
              if (!pending) return;
              setWorking(true);
              try {
                await pending.onConfirm();
                setPending(null);
              } finally {
                setWorking(false);
              }
            }}
          >
            {pending?.confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-subtle">{pending?.body}</p>
    </Modal>
  );

  return { ask, dialog };
}
