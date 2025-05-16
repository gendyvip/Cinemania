import KnownForCard from "../../shared/knowncard/KnownForCard";
import SectionHeader from "../../shared/heading/SectionHeader";
export default function KnownForSection({ topMovies, actorTrailers }) {
  const knownForData = topMovies ? topMovies : [];
  return (
    <div className="p-4">
      <SectionHeader title={"Known for"} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "30px",
          marginTop: "10px",
        }}
      >
        {knownForData.map((item, idx) => (
          <KnownForCard item={item} actorTrailers={actorTrailers} key={idx} />
        ))}
      </div>
    </div>
  );
}
