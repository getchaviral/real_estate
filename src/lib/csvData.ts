import type { Project } from "@/types/project";

function parseCSV(text: string) {
  const rows: string[][] = [];
  let cur = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      row.push(cur);
      cur = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cur);
      cur = '';
      // skip empty trailing line
      if (row.length === 1 && row[0] === '') {
        row = [];
        continue;
      }
      rows.push(row);
      row = [];
    } else {
      cur += ch;
    }
  }

  if (cur !== '' || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }

  return rows;
}

function headersToKey(header: string) {
  return header
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .map((part, idx) => (idx === 0 ? part : part[0].toUpperCase() + part.slice(1)))
    .join('');
}

function slugify(text?: string) {
  return (
    (text || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  );
}

function getAliasedField(row: Record<string, string>, aliases: string[]) {
  for (const alias of aliases) {
    const normalizedAlias = headersToKey(alias);
    const value = row[normalizedAlias] ?? row[alias] ?? row[alias.toLowerCase()];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value).trim();
    }
  }

  return '';
}

interface DeveloperAccumulator {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  coverImage: string;
  foundedYear: number;
  totalProjects: number;
  completedProjects: number;
  ongoingProjects: number;
  upcomingProjects: number;
  cityIds: Set<string>;
  localityIds: Set<string>;
  propertyTypeIds: Set<string>;
  projectIds: string[];
  ratings: number;
  totalReviews: number;
  contact: {
    phone: string;
    email: string;
    website: string;
    address: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  awards: unknown[];
  meta: { title: string; description: string; keywords: string };
  createdAt: string;
  updatedAt: string;
}

interface CitySummary {
  id: string;
  name: string;
  slug: string;
  count: number;
}

function inferAuthorityFromText(text: string) {
  const normalized = (text || '').toLowerCase();
  if (/greater noida|noida extension|greater noida west|greater noida expressway/.test(normalized)) {
    return 'greater noida';
  }
  if (/yamuna/.test(normalized)) {
    return 'yamuna';
  }
  if (/noida/.test(normalized)) {
    return 'noida';
  }
  return '';
}

function inferOwnershipFromText(text: string) {
  const normalized = (text || '').toLowerCase();
  if (/freehold/.test(normalized)) {
    return 'freehold';
  }
  if (/leasehold/.test(normalized)) {
    return 'leasehold';
  }
  return '';
}

export function readCSVProjectsFromString(raw: string) {
  const rows = parseCSV(raw);
  if (rows.length === 0) return [];
  const headerRow = rows[0].map((h) => headersToKey(h));
  const dataRows = rows.slice(1);

  const projects = dataRows.map((cols, idx) => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < headerRow.length; i++) {
      obj[headerRow[i]] = cols[i] !== undefined ? cols[i].trim() : '';
    }

    const sNo = getAliasedField(obj, ['S.No', 'S No', 'sNo']);
    const developer = getAliasedField(obj, ['builder name', 'Builder Name', 'builder', 'developer', 'Developer']);
    const projectName = getAliasedField(obj, ['project name', 'Project Name', 'name', 'Name']);
    const locationSectorArea = getAliasedField(obj, ['location', 'Location', 'location sector area', 'Location (Sector / Area)']);
    const address = getAliasedField(obj, ['address', 'Address']) || locationSectorArea;
    const projectTypeRaw = getAliasedField(obj, ['property types', 'Property Types', 'property type', 'Property Type', 'project type', 'Project Type']);
    const statusRaw = getAliasedField(obj, ['status', 'Status', 'raw status', 'Raw Status']);
    const reraNo = getAliasedField(obj, ['rera number', 'Rera Number', 'rera no', 'Rera No', 'RERA No.']);
    const areaAcres = getAliasedField(obj, ['area', 'Area', 'unit size range', 'Unit Size Range', 'area acres', 'Area (Acres)']);
    const towers = getAliasedField(obj, ['total towers', 'Total Towers', 'towers', 'Towers']);
    const units = getAliasedField(obj, ['total units', 'Total Units', 'units', 'Units']);
    const configuration = getAliasedField(obj, ['configuration', 'Configuration', 'configurations', 'Configurations']);
    const unitSizeRange = getAliasedField(obj, ['unit size range', 'Unit Size Range', 'area', 'Area']);
    const priceRangeApprox = getAliasedField(obj, ['price range', 'Price Range', 'price', 'Price', 'price range approx', 'Price Range (approx.)']);
    const possessionCompletion = getAliasedField(obj, ['possession date', 'Possession Date', 'possession', 'Possession', 'possession completion', 'Possession / Completion']);
    const featuresRaw = getAliasedField(obj, ['features', 'Features', 'key amenities features', 'Key Amenities / Features']);
    const amenitiesRaw = getAliasedField(obj, ['amenities', 'Amenities', 'key amenities features', 'Key Amenities / Features']);
    const notes = getAliasedField(obj, ['notes', 'Notes']);
    const authority = getAliasedField(obj, ['authority', 'Authority', 'jurisdiction', 'Jurisdiction', 'location authority', 'Location Authority']) || inferAuthorityFromText([locationSectorArea, address, projectName, notes].filter(Boolean).join(' '));
    const ownership = getAliasedField(obj, ['ownership', 'Ownership', 'ownership type', 'Ownership Type', 'freehold', 'Freehold', 'leasehold', 'Leasehold', 'freehold / leasehold', 'Freehold / Leasehold']) || inferOwnershipFromText([notes, projectName, locationSectorArea, address].filter(Boolean).join(' '));

    function parseDelimitedList(raw: string) {
      return raw
        .toString()
        .split(/[,;|]|\s+\+\s+|\s+and\s+/i)
        .map((value) => value.trim())
        .filter(Boolean);
    }

    function parseInteger(raw: string) {
      const value = raw ? raw.toString().replace(/[^0-9]/g, '') : '';
      return value ? Number(value) : undefined;
    }

    function normalizeStatus(raw: string) {
      const normalized = raw?.toString().trim().toLowerCase();
      if (!normalized) return '';
      if (normalized.includes('ready') || normalized.includes('completed')) return 'ready-to-move';
      if (normalized.includes('under') || normalized.includes('ongoing')) return 'under-construction';
      if (normalized.includes('pre')) return 'pre-launch';
      if (normalized.includes('new') || normalized.includes('upcoming')) return 'new-launch';
      return normalized;
    }

    function parsePriceRange(raw: string) {
      if (!raw) return { currency: 'INR', min: undefined, max: undefined };
      const currencyMatch = raw.match(/(₹|Rs\.?|INR|USD|EUR|GBP)/i);
      const currency = currencyMatch ? currencyMatch[0].replace(/Rs\.?/i, 'INR') : 'INR';
      const tokens = Array.from(raw.matchAll(/([0-9][0-9,]*(?:\.[0-9]+)?)(?:\s*(L|lac|lakh|Cr|crore))?/gi));
      const values = tokens
        .map(([, num, unit]) => {
          let value = Number(num.replace(/,/g, ''));
          if (!unit) return value;
          const u = unit.toLowerCase();
          if (u === 'l' || u === 'lac' || u === 'lakh') value *= 100000;
          if (u === 'cr' || u === 'crore') value *= 10000000;
          return value;
        })
        .filter((value) => !Number.isNaN(value));
      if (values.length === 0) {
        const fallback = raw.replace(/[^0-9.,]/g, '').replace(/,/g, '');
        const numeric = Number(fallback);
        return { currency, min: Number.isNaN(numeric) ? undefined : numeric, max: Number.isNaN(numeric) ? undefined : numeric };
      }
      return { currency, min: values[0], max: values[1] ?? values[0] };
    }

    const propertyTypes = projectTypeRaw ? parseDelimitedList(projectTypeRaw) : [];
    const locationParts = locationSectorArea.split(',').map((part: string) => part.trim()).filter(Boolean);
    const cityName = locationParts.length > 0 ? locationParts[locationParts.length - 1] : '';
    const locality = locationParts.length > 1 ? locationParts.slice(0, locationParts.length - 1).join(', ') : locationParts[0] || '';
    const slug = slugify(projectName) || `project-${idx}`;
    const developerSlug = slugify(developer || 'unknown-developer');
    const citySlug = slugify(cityName || 'unknown-city');
    const parsedPrice = parsePriceRange(priceRangeApprox);
    const parsedFeatures = parseDelimitedList(featuresRaw);
    const parsedAmenities = parseDelimitedList(amenitiesRaw);
    const status = normalizeStatus(statusRaw);
    const category = propertyTypes.some((type) => /commercial/i.test(type))
      ? 'commercial'
      : propertyTypes.some((type) => /mixed/i.test(type))
      ? 'mixed'
      : 'residential';
    const totalUnits = parseInteger(units);
    const totalTowers = parseInteger(towers);
    const isNewLaunch = /upcoming|new|pre/i.test(statusRaw.toLowerCase());
    const isFeatured = true;

    return {
      id: slug,
      slug,
      sNo,
      developer,
      builderName: developer,
      projectName,
      name: projectName,
      locationSectorArea,
      location: locationSectorArea,
      address,
      projectType: projectTypeRaw,
      propertyTypes,
      propertyType: propertyTypes,
      status,
      rawStatus: statusRaw,
      reraNo,
      reraNumber: reraNo,
      areaAcres,
      totalArea: areaAcres,
      towers,
      totalTowers,
      units,
      totalUnits,
      configuration,
      unitSizeRange,
      priceRangeApprox,
      priceRange: parsedPrice,
      possessionCompletion,
      possessionDate: possessionCompletion,
      possessionStatus: possessionCompletion,
      keyAmenitiesFeatures: [featuresRaw, amenitiesRaw].filter(Boolean).join(', '),
      features: parsedFeatures,
      amenities: parsedAmenities,
      notes,
      tagline: '',
      description: '',
      category,
      developerId: developerSlug,
      developerName: developer,
      cityId: citySlug,
      cityName,
      localityId: slugify(locality || cityName),
      locality,
      coordinates: { lat: 0, lng: 0 },
      configurations: [
        {
          type: configuration || propertyTypes[0] || 'N/A',
          area: unitSizeRange || '',
          price: parsedPrice,
        },
      ],
      images: { hero: '/images/placeholder-project.jpg', gallery: [], floorPlans: [], masterPlan: '' },
      nearbyPlaces: [],
      similarProjects: [],
      isFeatured,
      isNewLaunch,
      meta: { title: projectName, description: '', keywords: '' },
      createdAt: '',
      updatedAt: '',
    };
  });

  return projects;
}

export function normalizeDataset(projects: Project[]) {
  const developersMap: Record<string, DeveloperAccumulator> = {};
  const citiesMap: Record<string, CitySummary> = {};
  const propertyTypesSet = new Set<string>();

  projects.forEach((p) => {
    const developerName = p.builderName || p.developer || 'Unknown Developer';
    const developerSlug = slugify(developerName);
    const citySlug = slugify(p.cityName || 'unknown-city');
    const localitySlug = slugify(p.locality || p.cityName || 'unknown-locality');

    developersMap[developerSlug] = developersMap[developerSlug] || {
      id: developerSlug,
      slug: developerSlug,
      name: developerName,
      tagline: `${developerName} Projects`,
      description: `Explore premium projects from ${developerName}.`,
      logo: '/images/placeholder-logo.png',
      coverImage: '/images/placeholder-cover.jpg',
      foundedYear: 2000,
      totalProjects: 0,
      completedProjects: 0,
      ongoingProjects: 0,
      upcomingProjects: 0,
      cityIds: new Set<string>(),
      localityIds: new Set<string>(),
      propertyTypeIds: new Set<string>(),
      projectIds: [] as string[],
      ratings: 4.5,
      totalReviews: 120,
      contact: {
        phone: '',
        email: '',
        website: '',
        address: '',
      },
      socialLinks: {
        facebook: '',
        instagram: '',
        linkedin: '',
        youtube: '',
      },
      awards: [],
      meta: { title: developerName, description: '', keywords: '' },
      createdAt: '',
      updatedAt: '',
    };

    developersMap[developerSlug].totalProjects += 1;
    developersMap[developerSlug].projectIds.push(p.id);
    developersMap[developerSlug].cityIds.add(citySlug);
    developersMap[developerSlug].localityIds.add(localitySlug);
    (p.propertyTypes || []).forEach((type: string) => developersMap[developerSlug].propertyTypeIds.add(slugify(type)));

    if (p.status === 'ready-to-move') {
      developersMap[developerSlug].completedProjects += 1;
    } else if (p.status === 'under-construction') {
      developersMap[developerSlug].ongoingProjects += 1;
    } else if (p.status === 'new-launch' || p.status === 'pre-launch') {
      developersMap[developerSlug].upcomingProjects += 1;
    }

    if (p.cityName) {
      const slug = slugify(p.cityName);
      citiesMap[slug] = citiesMap[slug] || { id: slug, name: p.cityName, slug, count: 0 };
      citiesMap[slug].count += 1;
    }
    (p.propertyTypes || []).forEach((pt: string) => propertyTypesSet.add(pt));
  });

  const developers = Object.values(developersMap).map((developer) => ({
    ...developer,
    cityIds: Array.from(developer.cityIds || []),
    localityIds: Array.from(developer.localityIds || []),
    propertyTypeIds: Array.from(developer.propertyTypeIds || []),
  }));
  const cities = Object.values(citiesMap);
  const propertyTypes = Array.from(propertyTypesSet).map((name) => ({ id: slugify(name), name, slug: slugify(name) }));

  return { projects, developers, cities, propertyTypes };
}

const csvData = {
  readCSVProjectsFromString,
  normalizeDataset,
};

export default csvData;
