export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Data sourced from{" "}
          <a
            href="https://data.nasa.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:text-teal-300"
          >
            NASA Open Data Portal
          </a>
        </p>
        <p className="text-sm mt-2">
          Lunar Drift &copy; {new Date().getFullYear()} – Built for exploration
        </p>
      </div>
    </footer>
  );
}
