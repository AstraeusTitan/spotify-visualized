import { Container } from "@/components/Container";
import DescriptionList from "@/components/Shared/DescriptionList";
import { useSpotify } from "@/hooks/useSpotify";
import * as Api from "@/utilities/Spotify/Api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Playlist = () => {
  const router = useRouter();
  const { id } = router.query;
  const { spotify } = useSpotify();
  const [playlist, setPlaylist] = useState<Api.FullPlaylist | undefined>(
    undefined
  );

  useEffect(() => {
    if (spotify) {
      const result = spotify.Api.getPlaylist({ id: id as string });
      result
        .then((json) => {
          // TODO: do something once an error is identified
          if (!json.error) {
            setPlaylist(json as Api.FullPlaylist);
          }
        })
        .catch((reason) => console.info(reason));
    }
  }, [id, spotify]);

  return (
    <main className="mt-8">
      <Head>
        <title>{`Playlist: ${
          playlist?.name || id
        } - Spotify Visualized`}</title>
      </Head>
      <Container>
        <DescriptionList>
          <DescriptionList.Header>
            <DescriptionList.Header.Title>
              Full Playlist Details
            </DescriptionList.Header.Title>
            <DescriptionList.Header.Subtitle>
              Includes basic playlist data along with track data
            </DescriptionList.Header.Subtitle>
          </DescriptionList.Header>
          <DescriptionList.List>
            <DescriptionList.Item>
              <DescriptionList.Item.Name>Name</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {playlist?.name || (
                  <div className="h-5 w-24 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>
                Playlist Image
              </DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!playlist ? (
                  // TODO: Style
                  <div className="relative w-32 h-32 rounded overflow-hidden">
                    <Image
                      src={playlist.images[0].url}
                      alt={`${playlist.name} Image`}
                      fill
                    />
                  </div>
                ) : (
                  <div className="h-32 w-32 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Track Count</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {playlist?.tracks?.total.toLocaleString("en-US") || (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>
                Follower Count
              </DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {playlist?.followers?.total.toLocaleString("en-US") || (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Owner</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {playlist?.owner.display_name || (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Public</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {!!playlist ? (
                  playlist.public ? (
                    "Public"
                  ) : (
                    "Private"
                  )
                ) : (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>
                Collabrative
              </DescriptionList.Item.Name>
              <DescriptionList.Item.Description className="capitalize">
                {!!playlist ? (
                  playlist.collaborative ? (
                    "True"
                  ) : (
                    "False"
                  )
                ) : (
                  <div className="h-5 w-12 bg-gray-300 rounded"></div>
                )}
              </DescriptionList.Item.Description>
            </DescriptionList.Item>

            <DescriptionList.Item>
              <DescriptionList.Item.Name>Tracks</DescriptionList.Item.Name>
              <DescriptionList.Item.Description>
                {/* TODO: Figure out how to make a track list look nice */}
                Track list goes here
              </DescriptionList.Item.Description>
            </DescriptionList.Item>
          </DescriptionList.List>
        </DescriptionList>
      </Container>
    </main>
  );
};

export default Playlist;
