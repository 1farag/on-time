interface Props {
  insight: {
    content: {
      en: string;
      ar?: string;
    };
  };
}

export const SingleInsightConten_section = ({ insight }: Props) => {
  if (!insight?.content?.en) return;

  return (
    <div className="container mb-40 mt-20">
      <div
        dangerouslySetInnerHTML={{
          __html: insight.content.en,
        }}
      />
    </div>
  );
};
