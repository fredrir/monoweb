import { useQueryNotification } from "../../../app/notifications"
import { trpc } from "../../../trpc"

export const useAddCompanyToEventMutation = () => {
  const notification = useQueryNotification()
  return trpc.event.company.create.useMutation({
    onMutate: () => {
      notification.loading({
        title: "Legger til bedrift...",
        message: "Legger til bedriften som arrangør av dette arrangementet.",
      })
    },
    onSuccess: () => {
      notification.complete({
        title: "Bedrift lagt til",
        message: "Bedriften har blitt lagt til arrangørlisten.",
      })
    },
  })
}
