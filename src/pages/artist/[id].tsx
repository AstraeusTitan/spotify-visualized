import { Container } from "@/components/Container";
import DescriptionList from "@/components/Shared/DescriptionList";
import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Artist = () => {
  const router = useRouter();
  const { id } = router.query;
  const { spotify } = useSpotify();
  const [artist, setArtist] = useState<Api.Artist | undefined>(undefined);

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getArtist({ id: id as string });
      result
        .then((json) => {
          // TODO: do something once an error is identified
          if (!json.error) {
            setArtist(json as Api.Artist);
          }
        })
        .catch((reason) => console.info(reason));
    }
  }, [id, spotify]);

  return (
    <main className="mt-8">
      <Head>
        <title>{`Artist: ${artist?.name || id} - Spotify Visualized`}</title>
      </Head>
      <Container>
        <DescriptionList>
          <DescriptionList.Header>
            <DescriptionList.Header.Title>
              Full Artist Details
            </DescriptionList.Header.Title>
            <DescriptionList.Header.Subtitle>
              Includes basic artist data along with track and album data
            </DescriptionList.Header.Subtitle>
          </DescriptionList.Header>
          <DescriptionList.List>
            <DescriptionList.Item>
              <DescriptionList.Item.Name>Name</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {artist?.name || (
                  <div className="h-5 w-24 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>
                Profile Image
              </DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!artist ? (
                  // TODO: Style
                  <div className="relative w-32 h-32 rounded overflow-hidden">
                    <Image
                      src={artist.images[0].url}
                      alt={`${artist.name} Image`}
                      fill
                    />
                  </div>
                ) : (
                  <div className="h-32 w-32 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>
                Follower Count
              </DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {artist?.followers.total.toLocaleString("en-US") || (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Popularity</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {artist?.popularity || (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Genres</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!artist ? (
                  <div className="flex flex-col gap-2 capitalize">
                    {artist.genres.length ? (
                      artist.genres.map((g) => <span key={g}>{g}</span>)
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
              <DescriptionList.Item.Name>Top Tracks</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {/* TODO: Figure out how to make a track list look nice */}
                Track list goes here
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Albums</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {/* TODO: Figure out how to make a track list look nice */}
                Album list goes here
              </DescriptionList.Item.Description>
            </DescriptionList.Item>
          </DescriptionList.List>
        </DescriptionList>
      </Container>
    </main>
  );
};

export default Artist;
