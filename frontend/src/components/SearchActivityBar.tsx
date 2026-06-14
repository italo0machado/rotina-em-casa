// Atualizado: 14/06 15:35
import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import type { AtividadeBase } from '../data/atividades';

interface SearchActivityBarProps {
  activities: AtividadeBase[];
  onSelect: (activity: AtividadeBase) => void;
  placeholder?: string;
}

export default function SearchActivityBar({
  activities,
  onSelect,
  placeholder = 'Buscar atividade...',
}: SearchActivityBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filtered, setFiltered] = useState<AtividadeBase[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const results = activities
        .filter(
          (a) =>
            a.nome.toLowerCase().includes(q) ||
            a.categoria.toLowerCase().includes(q)
        )
        .slice(0, 8);
      setFiltered(results);
      setIsOpen(results.length > 0);
    } else {
      setFiltered([]);
      setIsOpen(false);
    }
  }, [query, activities]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (activity: AtividadeBase) => {
    onSelect(activity);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#b89a6f]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3 border-2 border-[#e8dcc6] rounded-2xl bg-white text-[#1f1810] placeholder:text-[#b89a6f] focus:border-[#1f1810] focus:outline-none transition-colors"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#b89a6f] hover:text-[#1f1810] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e8dcc6] rounded-2xl shadow-lg z-50 overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            {filtered.map((activity) => (
              <button
                key={activity.id}
                onClick={() => handleSelect(activity)}
                className="w-full px-4 py-3 text-left border-b border-[#f0e9d9] hover:bg-[#f8f5f0] transition-colors last:border-b-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-[#1f1810]">{activity.nome}</div>
                    <div className="text-xs text-[#8b7a65]">{activity.categoria}</div>
                  </div>
                  <div className="text-sm font-semibold text-[#b89a6f] bg-[#f8f5f0] px-3 py-1 rounded-full">
                    {activity.duracao}m
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {query && filtered.length === 0 && isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e8dcc6] rounded-2xl p-4 text-center text-[#8b7a65]">
          <p className="text-sm">Nenhuma atividade encontrada</p>
          <p className="text-xs mt-1 text-[#b89a6f]">
            Tente uma busca diferente ou crie uma atividade personalizada
          </p>
        </div>
      )}
    </div>
  );
}
