import { Container } from "@/components/Container";
import DescriptionList from "@/components/Shared/DescriptionList";
import AlbumTracks from "@/components/Track/AlbumTracks";
import { useSpotify } from "@/hooks/useSpotify";
import { Album } from "@/utilities/Spotify/Api/albums";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AlbumDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { spotify } = useSpotify();
  const [album, setAlbum] = useState<Album | undefined>(undefined);

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getAlbum(id as string);
      result
        .then((json) => {
          // TODO: do something once an error is identified
          if (!json.error) {
            setAlbum(json as Album);
          }
        })
        .catch((reason) => console.info(reason));
    }
  }, [id, spotify]);

  return (
    <main className="mt-8">
      <Head>
        <title>{`Album: ${album?.name || id} - Spotify Visualized`}</title>
      </Head>
      <Container>
        <DescriptionList>
          <DescriptionList.Header>
            <DescriptionList.Header.Title>
              Full Album Details
            </DescriptionList.Header.Title>
            <DescriptionList.Header.Subtitle>
              Includes basic album data along with track data
            </DescriptionList.Header.Subtitle>
          </DescriptionList.Header>
          <DescriptionList.List>
            <DescriptionList.Item>
              <DescriptionList.Item.Name>Name</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {album?.name || (
                  <div className="h-5 w-24 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Cover Image</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!album ? (
                  // TODO: Style
                  <div className="relative w-32 h-32 rounded overflow-hidden">
                    <Image
                      src={album.images[0].url}
                      alt={`${album.name} Cover`}
                      fill
                    />
                  </div>
                ) : (
                  <div className="h-32 w-32 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Artist</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                <div className="flex gap-2">
                  {!!album ? (
                    album.artists.map((a) => (
                      // TODO: Style
                      <Link
                        href={`/artist/${a.id}`}
                        key={a.id}
                        className="underline hover:text-indigo-600"
                      >
                        {a.name}
                      </Link>
                    ))
                  ) : (
                    <div className="h-5 w-24 bg-gray-300 rounded"></div>
                  )}
                </div>
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>
                Release Date
              </DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!album ? (
                  // TODO: add better formatting with accounting for precision
                  album.release_date
                ) : (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Type</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {album?.album_type || (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Track Count</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {album?.total_tracks || (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Popularity</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {album?.popularity || (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Genres</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!album ? (
                  <div className="flex flex-col gap-2 capitalize">
                    {album.genres.length ? (
                      album.genres.map((g) => <span key={g}>{g}</span>)
                    ) : (
                      <span>Genres not yet classified</span>
                    )}
                  </div>
                ) : (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>
                Record Label
              </DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {album?.label || (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Copyrights</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!album ? (
                  <div className="flex">
                    {album.copyrights.length ? (
                      <div className="flex flex-col gap-4">
                        {album.copyrights.map((c, i) => (
                          <div className="flex flex-col gap-2" key={i}>
                            <span>
                              {c.type === "C" ? "Copyright" : "Performance"}:
                            </span>
                            <span>{c.text}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span>No copyrights recorded</span>
                    )}
                  </div>
                ) : (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Track List</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                <AlbumTracks album={album} includeCharts all />
              </DescriptionList.Item.Description>
            </DescriptionList.Item>
          </DescriptionList.List>
        </DescriptionList>
      </Container>
    </main>
  );
};

export default AlbumDetails;
