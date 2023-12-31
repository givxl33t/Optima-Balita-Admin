import { CreateButton, DeleteButton, useRecordContext } from 'react-admin';

export const CreateCommentButton = () => {
  const discussion = useRecordContext();

  return (
    <CreateButton
      resource="comment"
      state={{ record: { discussion_id: discussion.id } }}
    />
  )
}

export const DeleteCommentButton = () => {
  const comment = useRecordContext();

  return (
    <DeleteButton
      resource="comment"
      redirect={`/forum/${comment.discussion_id}/show/1`}
    />
  )
}