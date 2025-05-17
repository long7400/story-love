import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Event } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { X } from "lucide-react";

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
}

export default function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden transform transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Dialog.Title className="text-2xl font-heading font-bold text-primary">
                    {event.title}
                  </Dialog.Title>
                  <button
                    className="text-gray-500 hover:text-gray-900 focus:outline-none"
                    onClick={onClose}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="bg-secondary/20 px-4 py-2 rounded-lg inline-block mb-4">
                  <span className="text-primary font-medium">
                    {formatDate(event.date)}
                  </span>
                </div>
                <div className="mb-6">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <div 
                    className="text-gray-700 prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: event.fullDescription }}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
