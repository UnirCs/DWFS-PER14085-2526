import { useState } from "react";
function Movie({ image, title, synopsis, duration, genre, rating }) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-contain bg-gray-900"
      />
      <div className="p-6 grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p
          className={`text-gray-600 text-sm mb-4 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {synopsis}
        </p>
        <button
          className="text-purple-600 hover:text-purple-700 text-sm font-semibold mb-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Leer menos" : "Leer más"}
        </button>
        <div className="space-y-2 text-sm text-gray-700">
          <p className="font-semibold">Duración: {duration}</p>
          <p className="font-semibold">Género: {genre}</p>
          <p className="font-semibold">⭐️ {rating}/10</p>
        </div>
      </div>
      <div className="p-6 pt-0">
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
          Seleccionar asientos
        </button>
      </div>
    </article>
  );
}
export default Movie;
