import {
  ComponentProps,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box } from "theme-ui";
import { LoaderContainer } from "./LoaderContainer";

const useAspectRatio = (aspect: "4/3" | "16/9") => {
  const ref = useRef<HTMLElement>();
  const [expectedHeight, setExpectedHeight] = useState<string>("auto");

  useEffect(() => {
    const observer = new ResizeObserver((entry) => {
      const bounds = entry[0];
      const width = bounds.contentRect.width;
      const height = aspect === "4/3" ? width * (3 / 4) : width * (9 / 16);
      if (bounds.contentRect.height !== height) {
        setExpectedHeight(height + "px");
      }
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [aspect]);

  return [ref, expectedHeight];
};

export const MediaView: FC<
  ComponentProps<typeof Box> & { src: string; type: "image" | "video" }
> = ({ src, type = "video", ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [ref, expectedHeight] = useAspectRatio("16/9");

  const onLoad = () => {
    // console.log("on MEDIA LOAD");
    setLoaded(true);
  };

  // const prefix = useMemo(() => , []);

  // console.log("MEDIA LOADED", loaded);

  return (
    <Box
      // onClick={() => setLoaded(!loaded)}
      ref={ref as any}
      style={{ height: expectedHeight as string }}
      sx={{ width: "100%", overflow: "hidden" }}
      {...props}
    >
      <LoaderContainer visible={!loaded} spinner="small">
        {type === "image" ? (
          <MediaImage src={src + "?" + Math.random()} onLoad={onLoad} />
        ) : (
          <MediaVideo src={src} onCanPlay={onLoad} />
        )}
      </LoaderContainer>
    </Box>
  );
};

export const MediaVideo: FC<
  ComponentProps<"video"> & { src: string; height?: string }
> = ({ src, ...props }) => {
  return (
    // @ts-ignore
    <Box
      as="video"
      poster={src.replace(".mp4", ".jpg")}
      autoPlay={true}
      playsInline={true}
      sx={{ objectFit: "cover", width: "100%" }}
      loop={true}
      {...props}
    >
      <source src={src} type="video/mp4"></source>
    </Box>
  );
};

export const MediaImage: FC<ComponentProps<"picture"> & { src: string }> = ({
  src,
  ...props
}) => {
  return (
    <picture {...props}>
      {/* <source></source> */}
      <img loading="lazy" src={src} width="100%" onLoad={props.onLoad} />
    </picture>
  );
};
