export default function SectionHeader({ title, subtitle }) {
  return (
    <>
      <div className="d-flex flex-column mb-3">
        <h2>
          <span className="ms-4 rounded-1 border-start border-5 border-warning"></span>
          <span className="ms-2">{title}</span>
        </h2>
        {subtitle && (
          <span
            className="text-muteded ms-4"
            style={{ color: "var(--cinemania-light-gray)" }}
          >
            This week's top TV and movies
          </span>
        )}
      </div>
    </>
  );
}
