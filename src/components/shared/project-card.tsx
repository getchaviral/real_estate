import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types/project';
import { formatPrice } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const getStatusVariant = (status: Project['status']) => {
    switch (status) {
      case 'ready-to-move':
        return 'success';
      case 'under-construction':
        return 'warning';
      case 'new-launch':
        return 'primary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-card">
      <Link href={`/project/${project.slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={project.images.hero}
            alt={project.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <Badge
            variant={getStatusVariant(project.status)}
            className="absolute top-2 right-2 capitalize"
          >
            {project.status.replace('-', ' ')}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg truncate text-card-foreground">{project.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1.5" />
            {project.locality}, {project.cityName}
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <Building className="w-4 h-4 mr-1.5" />
            By {project.developerName}
          </p>
          <p className="font-semibold text-primary mt-3 text-lg">
            {formatPrice(project.priceRange.min)} - {formatPrice(project.priceRange.max)}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
