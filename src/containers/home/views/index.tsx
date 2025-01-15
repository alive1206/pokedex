"use client";

import { useDataQueries, useDataQuery, useFavoritesAction } from "@/hooks";
import { MainLayout } from "@/layouts";
import { map } from "lodash";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Skeleton,
} from "antd";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

export const HomeViews = () => {
  const [data, setData] = useState<any[]>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams?.get("keyword");
  const gen = searchParams?.get("gen") || "1";
  const page = searchParams?.get("page") || 1;
  const pathname = usePathname();
  const { handleFavorites, removeFavorites, checkFavorites } =
    useFavoritesAction();

  const [form] = Form.useForm();

  const { data: pokemonsList } = useDataQuery({
    url: `/generation/${gen}`,
    dependencies: ["GET_POKEMON_LIST", gen],
  });

  const filteredPokemons = pokemonsList?.pokemon_species?.filter(
    (pokemon: any) =>
      pokemon.name.toLowerCase().includes(keyword?.toLowerCase() || "")
  );

  const pokemonsMetaQueries = useDataQueries({
    url: `/pokemon`,
    dependencies: ["GET_POKEMON_META"],
    itemList: filteredPokemons
      ?.slice(Number(page) * 10 - 10, Number(page) * 10)
      ?.map((species: any) => {
        const id = species.url.match(/\/(\d+)\/$/)?.[1];
        return id ? { id } : null;
      }),
    enabled: !!pokemonsList,
  });

  const pokemonsMetaList = Object.values(pokemonsMetaQueries).map(
    (pkm: any) => pkm.data
  );

  useEffect(() => {
    form.setFieldsValue({
      keyword,
      gen,
    });

    if (JSON.stringify(data) !== JSON.stringify(pokemonsMetaList)) {
      setData(pokemonsMetaList);
    }
  }, [form, keyword, gen, pokemonsMetaList]);

  return (
    <MainLayout>
      <div className="flex-1">
        <div className="w-full h-full relative">
          <Form
            form={form}
            layout="horizontal"
            onFinish={(values) => {
              const query = {
                ...(values.keyword && { keyword: values.keyword }),
                ...(values.gen && { gen: values.gen }),
              };
              const params = new URLSearchParams({
                ...query,
                page: 1,
              });

              router.push(`${pathname}?${params.toString()}`);
            }}
          >
            <Row gutter={16}>
              <Col span={24} lg={6}>
                <Form.Item label="Search" name="keyword">
                  <Input className="w-full" />
                </Form.Item>
              </Col>
              <Col span={24} lg={4}>
                <Form.Item label="Gen" name="gen">
                  <Select
                    className="w-full"
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                      { value: "4", label: "4" },
                      { value: "5", label: "5" },
                      { value: "6", label: "6" },
                      { value: "7", label: "7" },
                      { value: "8", label: "8" },
                      { value: "9", label: "9" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24} lg={8}>
                <Button
                  type="primary"
                  className="bg-yellow-300 text-black mr-2 w-1/4 hover:!bg-yellow-400"
                  htmlType="submit"
                >
                  Search
                </Button>
                <Button htmlType="button" onClick={() => router.push(pathname)}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="grid grid-cols-5 mt-8 gap-16 max-[1200px]:grid-cols-4 max-[992px]:grid-cols-3 max-sm:grid-cols-2 max-[576px]:grid-cols-1">
            {map(data, (pokemon) => (
              <div
                className="border w-full h-full flex flex-col items-center rounded-lg shadow-md relative py-10 overflow-hidden cursor-pointer group"
                key={pokemon?.id || pokemon?.name}
              >
                {pokemon?.sprites?.other?.showdown?.front_default ? (
                  <img
                    className="w-20 h-20 mb-2 pt-4 group-hover:scale-150 transition-transform duration-200"
                    src={`${pokemon?.sprites?.other?.showdown?.front_default}`}
                    onClick={() => router.push(`/detail/${pokemon.id}`)}
                  />
                ) : (
                  <Skeleton.Image active />
                )}
                <Divider />
                {pokemon?.name ? (
                  <div className="capitalize font-semibold">
                    {pokemon?.name}
                  </div>
                ) : (
                  <Skeleton.Input active />
                )}
                <div className="border rounded-[50%] absolute z-10 hover:scale-125 transition-transform duration-200 right-0 bottom-16 shadow-md bg-white">
                  {checkFavorites(pokemon) === true ? (
                    <HeartFilled
                      className="p-4 text-red-500"
                      onClick={() => removeFavorites(pokemon)}
                    />
                  ) : (
                    <HeartOutlined
                      className="p-4"
                      onClick={() => handleFavorites(pokemon)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center py-6">
            <Pagination
              showSizeChanger={false}
              current={Number(page) || 1}
              onChange={(page) => {
                const query = {
                  ...(keyword && { keyword: keyword }),
                  ...(gen && { gen: gen }),
                };
                const params = new URLSearchParams({
                  ...query,
                  page: String(page),
                });
                router.push(`${pathname}?${params.toString()}`);
              }}
              total={filteredPokemons?.length}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
