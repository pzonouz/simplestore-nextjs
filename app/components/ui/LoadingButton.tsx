export const LoadingButton = ({
  classname = "",
  loading,
  text,
}: {
  classname?: string;
  loading: boolean;
  text: string;
}) => {
  return (
    <button className={`${classname} btn btn-primary`}>
      {loading ? <div className="loading loading-spinner"></div> : text}
    </button>
  );
};
