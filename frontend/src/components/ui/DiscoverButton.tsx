import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"
import { useState } from "react";



const DiscoverButton = ({ children, to }: { children: React.ReactNode, to: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="text-center mt-16">
            <Link
                to={to}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="min-w-64 relative inline-flex items-center px-8 py-4 overflow-hidden bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
                <span className={`transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                    {children}
                </span>

                {/* Contenitore del cerchio che mantiene la posizione costante */}
                <div className="absolute top-0 right-0 w-full h-full flex items-center justify-end">
                    {/* Cerchio espandibile che si allarga da destra */}
                    <div
                        className={`flex items-center justify-center bg-white/20 rounded-full transition-all duration-500 ease-out ${isHovered
                            ? 'w-full h-full'
                            : 'w-8 h-8 mr-3'
                            }`}
                    >
                        <ArrowRight
                            size={16}
                            className={`text-white transition-all duration-300 ${isHovered ? 'scale-125' : ''
                                }`}
                        />
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default DiscoverButton;