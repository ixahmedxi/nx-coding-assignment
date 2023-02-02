import * as RadixDialog from '@radix-ui/react-dialog';
import { FC, PropsWithChildren } from 'react';
import { FiX } from 'react-icons/fi';

type DialogProps = {
  trigger: React.ReactNode;
  title: string;
  description: string;
  submitButtonOnClick?: () => void;
};

export const Dialog: FC<PropsWithChildren<DialogProps>> = ({
  children,
  trigger,
  title,
  description,
  submitButtonOnClick,
}) => {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="bg-black/50 fixed inset-0 animate-fade" />
        <RadixDialog.Content className="dark:bg-zinc-900 bg-white border-2 dark:border-zinc-800 border-zinc-100 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg max-h-[85vh] p-6 animate-show">
          <RadixDialog.Title className="text-lg font-semibold">
            {title}
          </RadixDialog.Title>
          <RadixDialog.Description className="dark:text-zinc-400 text-zinc-600 py-2">
            {description}
          </RadixDialog.Description>
          {children}
          <div className="flex items-center justify-end">
            <RadixDialog.Close asChild>
              <button
                className="bg-teal-500 px-4 py-2 rounded-lg text-black"
                onClick={submitButtonOnClick}
              >
                Save changes
              </button>
            </RadixDialog.Close>
          </div>
          <RadixDialog.Close asChild>
            <button
              className="rounded-full h-6 w-6 inline-flex items-center justify-center absolute top-3 right-3"
              aria-label="Close"
            >
              <FiX title="close-dialog" size={20} />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
